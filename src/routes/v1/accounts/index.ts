import { Router, Request, Response } from 'express';
import { authenticateJWT } from '@middleware/auth'; 


const router = Router();

// GET account details
router.get('/', authenticateJWT, (req: Request, res: Response) => {

    // Log the request object
    console.log(`req: ${req}`);

    // Get account details from Prisma
    // cont accountData = await prisma.account.findUnique({
    //     where: {
    //         id: req.params.id
    //     }
    // })

    // Scaffold account data
    const accountData = {
        accountId: "abc-123",
        accountName: "Primary Checking",
        balance: 17500.35,
        currency: "USD",
        accountType: "Checking"
    }

    // Return scaffolded account data
    res.json(accountData);
});

export default router;
