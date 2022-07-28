import { createSignal } from "solid-js";

export interface Player {
    id?: string;
    firstTurn: boolean;
    health: number;
  }

export function createPlayer(id?: string, firstTurn?: boolean, startingHealth?: number
  ): Player {
    return {
        firstTurn: firstTurn || false,
        health: startingHealth || 100,
        id: id || "Anonymous"
    }
  }
  


