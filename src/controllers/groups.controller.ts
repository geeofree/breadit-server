import { IRouter, Router } from "express";
import { ValidateJwtMiddleware } from "../middlewares";
import { GroupsService } from "../services";

const GroupsController: IRouter = Router();

GroupsController.get("/:groupName", async (req, res) => {
  try {
    const group = await GroupsService.getGroupByGroupName(req.params.groupName);

    if (!group) {
      return res.status(404).json({
        status: 404,
        message: "Could not retrieve group. Group does not exists.",
      });
    }

    res.status(200).json({
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

GroupsController.put(
  "/:groupName/subscription",
  ValidateJwtMiddleware,
  async (req, res) => {
    try {
      const { subscribe } = req.query;

      if (subscribe === "1") {
        const group = await GroupsService.groupSubscribe(
          req.params.groupName,
          req.currentUser.username
        );

        if (!group) {
          return res.status(404).json({
            status: 404,
            message:
              "Could not subscribe to group. User or group does not exist.",
          });
        }

        return res.status(200).json({
          status: 200,
          message: "Successfully subscribed to group.",
          data: group,
        });
      }

      if (subscribe === "0") {
        const group = await GroupsService.groupUnsubscribe(
          req.params.groupName,
          req.currentUser.username
        );

        if (!group) {
          return res.status(404).json({
            status: 404,
            message:
              "Could not unsubscribe to group. User or group does not exist.",
          });
        }

        return res.status(200).json({
          status: 200,
          message: "Successfully unsubscribed to group.",
          data: group,
        });
      }

      res
        .status(400)
        .json({
          status: 400,
          message: "Missing/invalid subscribe query value.",
        });
    } catch (error: any) {
      console.error(
        `Something went wrong while subscribing/unsubscribing to group:`,
        error
      );
      res.status(500).json({
        status: 500,
        message: `Something went wrong while subscribing/unsubscribing to group: ${error.message}`,
      });
    }
  }
);

export default GroupsController;
