# Supabase UUID Migration Guide

This guide explains the process of migrating from using Clerk authentication with integer IDs to Supabase authentication with UUID strings as primary keys.

## Changes Made

1. **Schema Updates**:
   - Modified the `users` table schema to use text/UUID as the primary key instead of auto-incrementing integers
   - Added a new `supabase_uuid` field to the `users` table
   - Updated related tables (quizAnswers, reports, payments) to use text for the `user_id` field to match the UUID format

2. **Code Updates**:
   - Updated `supabaseService.ts` to use the new `supabase_uuid` field instead of `clerk_id`
   - Updated user creation to use Supabase Auth UUID as the primary key
   - Updated error and success messages for better clarity

3. **Migration Scripts**:
   - Created `sql/supabase_uuid_migration.sql` for database schema modifications
   - Created `scripts/migrate-to-supabase-uuid.ts` to execute the schema migration

## Running the Migration

1. **Backup Your Database**:
   Always create a backup before running migrations:
   ```
   pg_dump -U <username> -d <database> > backup_before_migration.sql
   ```

2. **Run the Migration Script**:
   ```
   npm run migrate-uuid
   ```
   This will execute the SQL migration to add the `supabase_uuid` field and copy values from `clerk_id` where applicable.

3. **Verify the Migration**:
   - Check that users can still log in
   - Verify that existing users' data (quiz answers, reports) is still accessible
   - Confirm that new users can sign up and use the system

## Implementation Details

### Database Schema Changes

1. The `users` table primary key has been changed from an auto-incrementing integer to a UUID string from Supabase Auth.
2. Added a `supabase_uuid` column to maintain a consistent link between Supabase Auth and database records.
3. Modified related tables to use text for user IDs to properly support UUID references.

### API and Service Changes

1. User creation now uses the Supabase Auth UUID directly as the primary key.
2. Database lookup functions use the UUID directly without conversion.
3. Compatibility code has been retained to support existing users who may still have integer IDs.

## Known Issues and Solutions

1. **"record 'new' has no field 'updated_at'"**:
   - This is related to a removed trigger that was expecting an updated_at column
   - Solution: Remove all triggers dependent on updated_at field

2. **Missing User ID in Quiz Results**:
   - Issue: Quiz results may not load if user IDs are inconsistent
   - Solution: Ensure user IDs match between Supabase Auth and database records

## Rollback Plan

If issues are encountered:

1. Restore from the database backup
2. Revert code changes to the previous version
3. Restart the application