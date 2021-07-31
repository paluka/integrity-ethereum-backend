import express from 'express';
import { web3 } from '../services/web3';

const router = express.Router();

router.post('/upload', async (req, res, next) => {
  const hashedData = req.body.hashedData;
  const transactionObj = {
    from: web3.eth.defaultAccount,
    to: process.env.ETHEREUM_SMART_CONTRACT_ADDRESS,
    data: hashedData
  };

  const sendTransactionCallBack = (error, result) => {
    if (error) {
      console.log(error);
      res.send(`error: ${error}`);
    } else if (result) {
      console.log(result);
      res.send(`resulting transaction id: ${result}`);
    }
    res.end();
  };

  await web3.eth.sendTransaction(transactionObj, sendTransactionCallBack);
});

router.get('/health', (req, res, next) => {
  //console.log(web3.eth.accounts.wallet)
  res.send('health');
});

export default router;
