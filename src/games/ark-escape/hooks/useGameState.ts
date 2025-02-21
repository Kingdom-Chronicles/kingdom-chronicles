import { useState, useCallback } from 'react';
import { Resource, RESOURCE_CONFIG } from '../constants/resources';
import type { ResourceState, RoundScore } from '../types';

export const useGameState = () => {
  const [resources, setResources] = useState<ResourceState[]>(() => 
    Object.values(Resource).map(type => ({
      type,
      required: RESOURCE_CONFIG[type].baseRequired,
      collected: 0
    }))
  );

  const collectResource = useCallback((resourceType: Resource) => {
    setResources(prev => prev.map(resource => 
      resource.type === resourceType
        ? { ...resource, collected: Math.min(resource.collected + 1, resource.required) }
        : resource
    ));
  }, []);

  const calculateScore = useCallback((timeLeft: number): RoundScore => {
    let points = 0;
    let resourcesCollected = 0;
    let resourcesCompleted = 0;

    resources.forEach(resource => {
      resourcesCollected += resource.collected;
      if (resource.collected >= resource.required) {
        resourcesCompleted++;
        points += 100;
      } else {
        points += Math.floor((resource.collected / resource.required) * 50);
      }
    });

    const timeBonus = Math.floor(timeLeft * 0.5);
    points += timeBonus;

    return {
      points,
      resourcesCollected,
      resourcesCompleted,
      timeBonus
    };
  }, [resources]);

  const resetGame = useCallback(() => {
    setResources(Object.values(Resource).map(type => ({
      type,
      required: RESOURCE_CONFIG[type].baseRequired,
      collected: 0
    })));
  }, []);

  return {
    resources,
    collectResource,
    calculateScore,
    resetGame
  };
};