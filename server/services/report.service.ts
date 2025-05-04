import { IStorage } from '../storage';
import { Report, InsertReport, Payment, InsertPayment } from '@shared/schema';
import { logInfo, logError } from '../utils/logging';
import { cacheService } from './cache.service';

/**
 * Service for report-related operations
 */
export class ReportService {
  private db: IStorage;
  private readonly CACHE_PREFIX = 'report';
  private readonly TTL_REPORT = 300; // 5 minutes

  constructor(db: IStorage) {
    this.db = db;
  }

  /**
   * Get a report by ID
   * @param id Report ID
   * @returns Report or undefined
   */
  async getReportById(id: number): Promise<Report | undefined> {
    const cacheKey = `${this.CACHE_PREFIX}-id-${id}`;
    
    // Try to get from cache first
    const cachedReport = cacheService.get<Report>(cacheKey);
    if (cachedReport) {
      return cachedReport;
    }
    
    try {
      const report = await this.db.getReport(id);
      if (report) {
        // Cache the report
        cacheService.set(cacheKey, report, this.TTL_REPORT);
      }
      return report;
    } catch (error) {
      logError(`Error getting report with ID ${id}`, error);
      return undefined;
    }
  }

  /**
   * Get a report by user ID
   * @param userId User ID
   * @returns Report or undefined
   */
  async getReportByUserId(userId: string | number): Promise<Report | undefined> {
    const cacheKey = `${this.CACHE_PREFIX}-user-${userId}`;
    
    // Try to get from cache first
    const cachedReport = cacheService.get<Report>(cacheKey);
    if (cachedReport) {
      return cachedReport;
    }
    
    try {
      const report = await this.db.getReportByUserId(userId);
      if (report) {
        // Cache the report
        cacheService.set(cacheKey, report, this.TTL_REPORT);
        // Also cache by ID for future lookups
        cacheService.set(`${this.CACHE_PREFIX}-id-${report.id}`, report, this.TTL_REPORT);
      }
      return report;
    } catch (error) {
      logError(`Error getting report for user ${userId}`, error);
      return undefined;
    }
  }

  /**
   * Create a new report
   * @param reportData Report data
   * @returns Created report
   */
  async createReport(reportData: InsertReport): Promise<Report> {
    try {
      const report = await this.db.createReport(reportData);
      logInfo(`Created new report with ID: ${report.id} for user: ${report.userId}`);
      
      // Invalidate cache
      this.invalidateReportCache(report.id, report.userId);
      
      return report;
    } catch (error) {
      logError(`Error creating report for user ${reportData.userId}`, error);
      throw error;
    }
  }

  /**
   * Update report payment status
   * @param id Report ID
   * @param isPaid Payment status
   * @returns Updated report
   */
  async updateReportPaymentStatus(id: number, isPaid: boolean): Promise<Report> {
    try {
      const report = await this.db.updateReportPaymentStatus(id, isPaid);
      logInfo(`Updated payment status for report ${id} to: ${isPaid}`);
      
      // Invalidate cache
      this.invalidateReportCache(id, report.userId);
      
      return report;
    } catch (error) {
      logError(`Error updating payment status for report ${id}`, error);
      throw error;
    }
  }

  /**
   * Create a payment for a report
   * @param paymentData Payment data
   * @returns Created payment
   */
  async createPayment(paymentData: InsertPayment): Promise<Payment> {
    try {
      const payment = await this.db.createPayment(paymentData);
      logInfo(`Created new payment with ID: ${payment.id} for report: ${payment.reportId}`);
      
      // Get the report to update its payment status
      const report = await this.getReportById(payment.reportId);
      if (report) {
        // Update the report payment status based on payment status
        await this.updateReportPaymentStatus(
          report.id, 
          payment.status === 'completed' || payment.status === 'succeeded'
        );
      }
      
      return payment;
    } catch (error) {
      logError(`Error creating payment for report ${paymentData.reportId}`, error);
      throw error;
    }
  }

  /**
   * Get payment by report ID
   * @param reportId Report ID
   * @returns Payment or undefined
   */
  async getPaymentByReportId(reportId: number): Promise<Payment | undefined> {
    try {
      return await this.db.getPaymentByReportId(reportId);
    } catch (error) {
      logError(`Error getting payment for report ${reportId}`, error);
      return undefined;
    }
  }

  /**
   * Update payment status
   * @param id Payment ID
   * @param status New payment status
   * @returns Updated payment
   */
  async updatePaymentStatus(id: number, status: string): Promise<Payment> {
    try {
      const payment = await this.db.updatePaymentStatus(id, status);
      logInfo(`Updated payment ${id} status to: ${status}`);
      
      // If payment is successful, update the report's payment status
      if (status === 'completed' || status === 'succeeded') {
        await this.updateReportPaymentStatus(payment.reportId, true);
      }
      
      return payment;
    } catch (error) {
      logError(`Error updating payment status for payment ${id}`, error);
      throw error;
    }
  }

  /**
   * Invalidate report cache
   * @param reportId Report ID
   * @param userId User ID
   */
  invalidateReportCache(reportId: number, userId?: string | number): void {
    cacheService.del(`${this.CACHE_PREFIX}-id-${reportId}`);
    if (userId) {
      cacheService.del(`${this.CACHE_PREFIX}-user-${userId}`);
      // Also invalidate user profile cache
      cacheService.del(`user-profile-${userId}`);
    }
  }
}
