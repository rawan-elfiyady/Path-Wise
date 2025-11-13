const express = require("express");
const router = express.Router();
const AdminServices = require("../Services/AdminServices");

router.post("/Roadmap", async (req, res, next) => {
    try {
        const {name, entityType, entityId} = req.body;
        const Roadmap = await AdminServices.createRoadmap({name, entityType, entityId});
        res.status(201).json("Roadmap created successfully", Roadmap);
    }
    catch (error){
        next(error);
    }
});

router.get("/Roadmaps", async (req, res , next) => {
    try {
        const Roadmaps = await AdminServices.getAllRoadmaps();
        res.status(200).json(Roadmaps);
    }
    catch (err) {
        next(err);
    }
});

router.get("/RoadmapId/:Id", async (req, res, next) => {
    try{
        const Id = req.params.Id;
        const Roadmap = await AdminServices.getRoadmapById(Id);
        res.status(200).json(Roadmap);
    }
    catch(err) {
        next(err);
    }
});

router.get("/RoadmapName", async (req, res, next) => {
    try{
        const {Name} = req.body;
        const Roadmap = await AdminServices.getRoadmapByName(Name);
        res.status(200).json(Roadmap);
    }
    catch(err) {
        next(err);
    }
}); 

router.get("/TrackRoadmaps/:Id", async (req, res, next) => {
    try{
        const Id = req.params.Id;
        const TrackRoadmaps = await AdminServices.getTrackRoadmaps(Id);
        res.status(200).json(TrackRoadmaps);
    }
    catch(err) {
        next(err);
    }
});

router.get("/SearchRoadmaps", async (req, res, next) => {
  try {
    const { search } = req.query; 
    const roadmaps = await AdminServices.searchRoadmaps(search);
    res.status(200).json({
      success: true,
      count: roadmaps.length,
      data: roadmaps,
    });
  } catch (err) {
    next(err);
  }
});


router.put("/UpdateRoadmap/:id", async (req, res, next) => {
    try{
        const id = req.params.id;
        const updates = req.body;
        const updated = await AdminServices.updateRoadmap(id, updates);
        res.status(200).json("Roadmap updated successfully", updated);
    }
    catch(err) {
        next(err);
    }
});

router.delete("/deleteRoadmap/:id", async (req, res, next) => {
    
    try{
        const Id = req.params.id;
        const deletedRoadmap = await AdminServices.deleteRoadmap(Id);
        res.status(200).json("Roadmap deleted successfully:", deletedRoadmap );
    }
    catch(err) {
        next(err);
    }
});