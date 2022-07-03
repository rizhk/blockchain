import { PicanteApi } from './end-point';

type CreateSellOfferRequest = {
  wallet_addr: string; ////TODO: https://picante.atlassian.net/jira/software/projects/PP/boards/2?selectedIssue=PP-160
  buy_gem: string; //TODO: apply selected fiat
  pay_gem: string; //TODO: https://picante.atlassian.net/jira/software/projects/PP/boards/2?selectedIssue=PP-160
  pay_gem_total: number; //TODO https://picante.atlassian.net/jira/software/projects/PP/boards/2?selectedIssue=PP-160
  receiving_bank_id: string;
  network_id: string; //TODO
};

class SellOfferApi {
  async create({
    wallet_addr,
    buy_gem,
    pay_gem,
    pay_gem_total,
    receiving_bank_id,
    network_id,
  }: {
    wallet_addr: string; ////TODO: https://picante.atlassian.net/jira/software/projects/PP/boards/2?selectedIssue=PP-160
    buy_gem: string; //TODO: apply selected fiat
    pay_gem: string; //TODO: https://picante.atlassian.net/jira/software/projects/PP/boards/2?selectedIssue=PP-160
    pay_gem_total: number; //TODO https://picante.atlassian.net/jira/software/projects/PP/boards/2?selectedIssue=PP-160
    receiving_bank_id: string;
    network_id: string; //TODO
  }): Promise<string> {
    return new Promise((resolve, reject) => {
      const accessToken = globalThis.localStorage.getItem('accessToken') || '';

      const req: CreateSellOfferRequest = {
        wallet_addr: wallet_addr, ////TODO: https://picante.atlassian.net/jira/software/projects/PP/boards/2?selectedIssue=PP-160
        buy_gem: 'GBP', //TODO: apply selected fiat
        pay_gem: '0x1380775A05F321871bDc7F3fFe365c902dDCAbBe', //TODO: https://picante.atlassian.net/jira/software/projects/PP/boards/2?selectedIssue=PP-160
        pay_gem_total: Number(pay_gem_total), //TODO https://picante.atlassian.net/jira/software/projects/PP/boards/2?selectedIssue=PP-160
        receiving_bank_id: receiving_bank_id,
        network_id: '80001', //TODO
      };

      console.log(req);

      fetch(PicanteApi.SellOffer, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authentication: accessToken,
        },
        body: JSON.stringify(req),
      })
        .then((response) => response.json())
        .then(
          (data) => {
            if (!data.error) {
              return resolve(data.offer_id);
            }
          },
          (error) => {
            return reject(new Error(error.message));
          },
        );
    });
  }
}

export const sellOfferApi = new SellOfferApi();
