-- Create extension for UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create enums
CREATE TYPE "Role" AS ENUM ('USER', 'CREATOR', 'ADMIN');
CREATE TYPE "PageStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');
CREATE TYPE "BookingStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED', 'COMPLETED', 'CANCELLED');
CREATE TYPE "PaymentStatus" AS ENUM ('UNPAID', 'PAID', 'REFUNDED');

-- Create tables
CREATE TABLE "User" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "mobile" TEXT,
    "role" "Role" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "PromotionPage" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
    "ownerId" TEXT NOT NULL,
    "pageName" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "pageUrl" TEXT NOT NULL,
    "niche" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "region" TEXT,
    "language" TEXT,
    "followersCount" INTEGER NOT NULL,
    "averageViews" INTEGER,
    "engagementRate" DOUBLE PRECISION,
    "audienceGender" TEXT,
    "audienceAgeGroup" TEXT,
    "audienceLocation" TEXT,
    "description" TEXT,
    "profileImage" TEXT,
    "analyticsImages" TEXT[],
    "status" "PageStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PromotionPage_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Pricing" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
    "pageId" TEXT NOT NULL,
    "storyPrice" DOUBLE PRECISION NOT NULL,
    "postPrice" DOUBLE PRECISION NOT NULL,
    "reelPrice" DOUBLE PRECISION NOT NULL,
    "videoMentionPrice" DOUBLE PRECISION,
    "customPackagePrice" DOUBLE PRECISION,

    CONSTRAINT "Pricing_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Booking" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
    "userId" TEXT NOT NULL,
    "pageId" TEXT NOT NULL,
    "promotionType" TEXT NOT NULL,
    "campaignTitle" TEXT NOT NULL,
    "campaignDescription" TEXT NOT NULL,
    "contentLink" TEXT,
    "preferredDate" TIMESTAMP(3) NOT NULL,
    "budget" DOUBLE PRECISION,
    "status" "BookingStatus" NOT NULL DEFAULT 'PENDING',
    "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'UNPAID',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- Create indexes
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "Pricing_pageId_key" ON "Pricing"("pageId");

-- Add foreign keys
ALTER TABLE "PromotionPage"
ADD CONSTRAINT "PromotionPage_ownerId_fkey"
FOREIGN KEY ("ownerId") REFERENCES "User"("id")
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "Pricing"
ADD CONSTRAINT "Pricing_pageId_fkey"
FOREIGN KEY ("pageId") REFERENCES "PromotionPage"("id")
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "Booking"
ADD CONSTRAINT "Booking_userId_fkey"
FOREIGN KEY ("userId") REFERENCES "User"("id")
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "Booking"
ADD CONSTRAINT "Booking_pageId_fkey"
FOREIGN KEY ("pageId") REFERENCES "PromotionPage"("id")
ON DELETE CASCADE ON UPDATE CASCADE;
