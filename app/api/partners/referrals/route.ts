import { forwardPartnerIntake } from '@/lib/partner-intake'
export async function POST(request: Request) { return forwardPartnerIntake(request, 'referrals') }
