import Transaction from '../models/Transaction';
import Balance from '../models/Balance';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const totalIncome = this.transactions.reduce((acumulador, current) => {    
      return acumulador += current.type === 'income' ? current.value : 0;
      }, 0);

    const totalOutcome = this.transactions.reduce((acumulador, current) => {    
      return acumulador += current.type === 'outcome' ? current.value : 0;
      }, 0);

    const total = totalIncome - totalOutcome;

    const balance: Balance = {income: totalIncome, outcome: totalOutcome, total: total};
       
    return balance;
  
  }

  public create({title, type, value}: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({title, value, type});
       
    this.transactions.push(transaction);

    return transaction;

  }
}

export default TransactionsRepository;
