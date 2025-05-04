import { Router, Request, Response } from 'express';
import { isAuthenticated } from '../middleware/auth-middleware';
import { asyncHandler } from '../utils/error-handler';
import { successResponse, errorResponse } from '../utils/response-formatter';
import { ReportService } from '../services/report.service';

/**
 * Initialize report routes
 * @param reportService Report service instance
 * @returns Router with report routes
 */
export function initReportRoutes(reportService: ReportService) {
  const router = Router();

  // Get report for authenticated user
  router.get('/report', isAuthenticated, asyncHandler(async (req: Request, res: Response) => {
    if (!req.user?.id) {
      return res.status(401).json(errorResponse('Unauthorized', 401));
    }

    const report = await reportService.getReportByUserId(req.user.id);
    if (!report) {
      return res.json(successResponse(null, 'No report found'));
    }

    // Get payment information if available
    const payment = await reportService.getPaymentByReportId(report.id);
    
    res.json(successResponse({
      report,
      payment
    }));
  }));

  return router;
}
