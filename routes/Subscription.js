import express from 'express';
import { ActiveSubscription, AllSubscription, createSubscription, } from '../controller/Subscription.js';

const Subsrouter = express.Router();

Subsrouter.post('/createSubscription',createSubscription);
Subsrouter.get('/AllSubscription',AllSubscription);
Subsrouter.get('/activeSubscription',ActiveSubscription);



export default Subsrouter;
