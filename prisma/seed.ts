import bcrypt from "bcryptjs";
import { prisma } from "../packages/db/src";

async function seed() {
  const hashedPassword = await bcrypt.hash("password123", 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@promohub.com" },
    update: {},
    create: {
      name: "PromoHub Admin",
      email: "admin@promohub.com",
      password: hashedPassword,
      role: "ADMIN"
    }
  });

  const creator = await prisma.user.upsert({
    where: { email: "creator@promohub.com" },
    update: {},
    create: {
      name: "Nina Creator",
      email: "creator@promohub.com",
      password: hashedPassword,
      role: "CREATOR",
      mobile: "+91-9999999999"
    }
  });

  const user = await prisma.user.upsert({
    where: { email: "user@promohub.com" },
    update: {},
    create: {
      name: "Arjun Brand",
      email: "user@promohub.com",
      password: hashedPassword,
      role: "USER"
    }
  });

  const page = await prisma.promotionPage.upsert({
    where: { id: "11111111-1111-1111-1111-111111111111" },
    update: {},
    create: {
      id: "11111111-1111-1111-1111-111111111111",
      ownerId: creator.id,
      pageName: "Tech With Nina",
      platform: "Instagram",
      pageUrl: "https://instagram.com/techwithnina",
      niche: "Tech",
      state: "Karnataka",
      city: "Bengaluru",
      region: "South",
      language: "English",
      followersCount: 125000,
      averageViews: 48000,
      engagementRate: 5.8,
      audienceGender: "Mixed",
      audienceAgeGroup: "18-34",
      audienceLocation: "India metro cities",
      description: "High-trust creator for consumer tech launches and app promotions.",
      profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      analyticsImages: [
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f"
      ],
      status: "APPROVED",
      pricing: {
        create: {
          storyPrice: 250,
          postPrice: 450,
          reelPrice: 600,
          videoMentionPrice: 350,
          customPackagePrice: 1200
        }
      }
    }
  });

  await prisma.booking.upsert({
    where: { id: "22222222-2222-2222-2222-222222222222" },
    update: {},
    create: {
      id: "22222222-2222-2222-2222-222222222222",
      userId: user.id,
      pageId: page.id,
      promotionType: "Reel",
      campaignTitle: "PromoHub Launch Push",
      campaignDescription: "Drive awareness for the new PromoHub influencer marketplace.",
      preferredDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      budget: 800,
      status: "PENDING",
      paymentStatus: "UNPAID"
    }
  });

  console.log({ admin: admin.email, creator: creator.email, user: user.email, seededPage: page.pageName });
}

seed()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
