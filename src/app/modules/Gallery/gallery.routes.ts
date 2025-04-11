import { Router } from "express";
import { GalleryController } from "./gallery.controller";



const router = Router();

router.get("/", GalleryController.getAllGallery);

router.post("/", GalleryController.createGallery);



export const GalleryRoutes = router;