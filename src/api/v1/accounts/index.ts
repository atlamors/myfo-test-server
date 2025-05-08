import { Router, Request, Response } from 'express';
import { authenticateJWT } from '@middleware/auth';

const router = Router();

// Simulate an account database
const accountData = [
    {
        accountId: "abc-123",
        accountName: "Primary Checking",
        balance: 17500.35,
        currency: "USD",
        accountType: "Checking"
    },
    {
        accountId: "def-456",
        accountName: "Savings",
        balance: 1000.00,
        currency: "USD",
        accountType: "Savings"
    }
];

// GET account details
router.get('/:accountId', authenticateJWT, (req: Request, res: Response): void => {

    // Get the account ID from the request parameters
    const accountId = req.params.accountId;
    console.log(`Account ID: ${accountId}`);

    // Simulate a database call
    // cont account = await prisma.account.findUnique({ where: { id: accountId } })
    const account = accountData.find(account => account.accountId === accountId);
    
    // If no account is found, return a 404 error
    if (!account) {
        res.status(404).json({
            error: {
                message: `Account with ID ${accountId} not found`
            }
        });
    }


    // Return scaffolded account data
    res.json(account);
});

export default router;
