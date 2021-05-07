import { Router } from 'express';
import Balance from '../models/Balance';
import Transaction from '../models/Transaction';

 import TransactionsRepository from '../repositories/TransactionsRepository';
 import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

interface Response {
  transactions: Transaction[];
  balance: Balance;
}

transactionRouter.get('/', (request, response) => {
  try {
    const transactions = transactionsRepository.all();
    const balance = transactionsRepository.getBalance();

    const resposta: Response = {transactions: transactions, balance: balance};

    return response.json(resposta);

  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    const { title, value, type  } = request.body;
    
    const createTransaction = new CreateTransactionService(transactionsRepository);

    
    const transaction =  createTransaction.execute({title, value, type});

    return response.json(transaction);


  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
