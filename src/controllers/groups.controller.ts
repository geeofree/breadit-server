import { IRouter, Router } from "express";
import { GroupsService } from "../services";

const GroupsController: IRouter = Router();

GroupsController.post("/", async (req, res) => {
  try {
    const newGroup = await GroupsService.createGroup(req.body);

    if (newGroup === null) {
      return res
        .status(404)
        .json({
          status: 404,
          message: "Failed to create group. User does not exist.",
        });
    }

    res
      .status(201)
      .json({
        status: 201,
        message: "Successfully created a new group.",
        data: newGroup,
      });
  } catch (error: any) {
    console.error(`Something went wrong while creating group:`, error);
    res.status(500).json({
      status: 500,
      message: `Something went wrong while creating group: ${error.message}`,
    });
  }
});

export default GroupsController;
