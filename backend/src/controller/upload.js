"use strict";
const fs = require("fs");
const path = require("path");
const Upload = require("../models/upload");

module.exports = {
  list: async (req, res) => {
    const data = await res.getModelList(Upload);

    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Upload),
      data,
    });
  },

  create: async (req, res) => {
    const { files } = req;
    const { type } = req.body;

  if (!files || files.length === 0) {
    return res.status(400).send({
      error: true,
      message: "No Files uploaded.",
    });
  }

  const fileData = files.map(file => ({
    filename: file.filename,
    path: file.path,
    originalName: file.originalname,
    mimetype: file.mimetype,
    size: file.size,
    type,
  }));

  const newFiles = await Upload.insertMany(fileData);

  res.status(200).send({
    message: "Files Uploaded successfully",
    files: newFiles,
  })

  },


  read: async (req, res) => {
    const data = await Upload.findOne({ _id: req.params.uploadId });

    res.status(200).send({
      error: false,
      data,
    });
  },

  update: async (req, res) => {
    const data = await Upload.updateOne(
      { _id: req.params.uploadId },
      req.body,
      {
        runValidators: true,
      }
    );

    res.status(202).send({
      error: false,
      data,
      new: await Upload.findOne({ _id: req.params.uploadId }),
    });
  },

  delete: async (req, res) => {
 
    try {
      const upload = await Upload.findById(req.params.uploadId);
      if (!upload) {
        return res.status(404).send({
          error: true,
          message: "Upload not found",
        });
      }

      const data = await Upload.deleteOne({ _id: req.params.uploadId });
      console.log(req.params.uploadId);
     
      if (data.deletedCount) {
        const HOST = process.env.HOST;
        const PORT = process.env.PORT;
       
        const baseDir = path.join(__dirname, "../../"); 
        const filepath = path.join(baseDir, upload.path); 
        fs.access(filepath, fs.constants.F_OK, (err) => {
          if (err) {
            return res.status(404).send({
              error: true,
              message: "File not found on server",
            });
          }

        
          fs.unlink(filepath, (err) => {
            if (err) {
              return res.status(500).send({
                error: true,
                message: "Error deleting file from server",
              });
            }

            res.status(204).send({
              error: false,
            });
          });
        });
      } else {
        res.status(404).send({
          error: true,
          message: "Error deleting document from database",
        });
      }
    } catch (err) {
      res.status(500).send({
        error: true,
        message: "Server error",
      });
    }

  },
};