export interface Player {
    name: string;
    health: number;
  }

export function createPlayer(name?: string, startingHealth?: number
  ): Player {
    return {
        health: startingHealth || 100,
        name: name || "Anonymous"
    }
  }
  


