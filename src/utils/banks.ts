interface Transaction {
  amount: number;
  type: string;
}

export const bankParsers: { [bank: string]: (content: string) => Transaction | undefined } = {
  "Bank Mellat": (content) => {
    const withdrawalRegex = /برداشت(.+)/;
    const depositRegex = /واریز(.+)/;
    const balanceChange = content.split('\n')[1];
    const withdrawalMatch = balanceChange.match(withdrawalRegex);
    const depositMatch = balanceChange.match(depositRegex);

    if (withdrawalMatch) {
      const amount = parseInt(withdrawalMatch[1].replace(/,/g, ""));
      return { amount, type: "withdrawal" };
    } else if (depositMatch) {
      const amount = parseInt(depositMatch[1].replace(/,/g, ""));
      return { amount, type: "deposit" };
    }

    return undefined; // Return undefined if neither match
  },
};

