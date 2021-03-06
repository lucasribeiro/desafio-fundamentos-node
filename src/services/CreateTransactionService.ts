import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
} 

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({title, value, type}: Request): Transaction {
        
    if (type === 'outcome'){      
      const balance = this.transactionsRepository.getBalance();
      const total = balance.outcome + value;
      if (total > balance.income) {
        throw Error('Valor não disponivel');
      }  
    }

    const transaction = this.transactionsRepository.create({title, type, value});

    return transaction;
  }
}

export default CreateTransactionService;
