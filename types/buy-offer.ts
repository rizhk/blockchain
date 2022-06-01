export interface CreateBuyOfferRequest {
	wallet_addr: string; ////TODO: https://picante.atlassian.net/jira/software/projects/PP/boards/2?selectedIssue=PP-160
	buy_gem: string; //TODO: apply selected fiat
	pay_gem: string; //TODO: https://picante.atlassian.net/jira/software/projects/PP/boards/2?selectedIssue=PP-160
	pay_gem_total: number; //TODO https://picante.atlassian.net/jira/software/projects/PP/boards/2?selectedIssue=PP-160
	payment_method: string;
	network_id: string; //TODO
}
