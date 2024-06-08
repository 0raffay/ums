"use client"
 
import { z } from "zod"
 
export const textField = z.string().min(2).max(50);