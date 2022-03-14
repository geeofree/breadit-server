import { IRouter, Router } from "express";
import { GroupsService } from "../services";

const GroupsController: IRouter = Router();

GroupsController.get("/:groupName", async (req, res) => {
  try {
    const group = await GroupsService.getGroupByGroupName(req.params.groupName);

    if (!group) {
      return res
        .status(404)
        .json({
          status: 404,
          message: "Could not retrieve group. Group does not exists.",
        });
    }

    res
      .status(200)
      .json({
        status: 200,
        message: "Successfully retrieved group.",
        data: group,
      });
  } catch (error: any) {
    console.error(`Something went wrong while fetching a group:`, error);
    res.status(500).json({
      status: 500,
      message: `Something went wrong while fetching a group: ${error.message}`,
    });
  }
});

GroupsController.post("/", async (req, res) => {
  try {
    const newGroup = await GroupsService.createGroup(req.body);

    if (newGroup === null) {
      return res.status(404).json({
        status: 404,
        message: "Failed to create group. User does not exist.",
      });
    }

    res.status(201).json({
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
