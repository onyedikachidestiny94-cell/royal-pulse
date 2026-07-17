import { Router, type IRouter } from "express";
import healthRouter from "./health";
import articlesRouter from "./articles";
import categoriesRouter from "./categories";
import commentsRouter from "./comments";
import newsletterRouter from "./newsletter";
import tipsRouter from "./tips";
import searchRouter from "./search";
import uploadRouter from "./upload";

const router: IRouter = Router();

router.use(healthRouter);
router.use(articlesRouter);
router.use(categoriesRouter);
router.use(commentsRouter);
router.use(newsletterRouter);
router.use(tipsRouter);
router.use(searchRouter);
router.use(uploadRouter);

export default router;
