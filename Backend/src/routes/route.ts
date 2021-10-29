import {Router} from 'express';

const router:Router = Router();

import {controller} from '../controller/controler';

router.get('/',controller.helloWorld);

router.post('/interpretar',controller.interpretar);

export default router;