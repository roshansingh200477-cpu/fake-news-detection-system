import express from "express";
import * as authService from "./auth.service.js";

// Creating User using req and res
export const createUser = async (req, res, next)=>{
    try {
        const user = await authService.register(req.body);
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
};

// login User using req and res
export const loginUser = async (req, res, next)=>{
    try {
        const data = await authService.login(req.body);
        res.status(201).json(data);
    } catch (error) {
        next(error);
    }
};

// getUser  User using req and res
export const getUser = async (req, res, next)=>{
    try {
        res.status(201).json(req.user);
    } catch (error) {
        next(error);
    }
};
