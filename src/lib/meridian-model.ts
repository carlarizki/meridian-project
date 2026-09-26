export type MeridianScenario = {
  exposureCutoff: number;
  fitThreshold: number;
  reskillPassRate: number;
};

export type TransitionPortfolio = {
  priorityCohort: number;
  highExposureWork: number;
  lowerExposureWork: number;
  directRedeploy: number;
  reskillRedeploy: number;
  longerReskill: number;
  furtherAssessment: number;
  voluntaryReview: number;
  projectedLandings: number;
};

export const DEFAULT_SCENARIO: MeridianScenario = {
  exposureCutoff: 70,
  fitThreshold: 60,
  reskillPassRate: 75,
};

const roundToTen = (value: number) => Math.round(value / 10) * 10;

export function calculatePortfolio(scenario: MeridianScenario): TransitionPortfolio {
  const priorityCohort = 6000;
  const highExposureWork = roundToTen(priorityCohort * scenario.exposureCutoff / 100);
  const lowerExposureWork = priorityCohort - highExposureWork;
  const conservativeShift = Math.round((scenario.fitThreshold - 60) / 5) * 80;

  const directRedeploy = Math.max(0, roundToTen(highExposureWork * 0.286 - conservativeShift));
  const reskillRedeploy = Math.max(0, roundToTen(highExposureWork * 0.429 + conservativeShift * 0.45));
  const longerReskill = Math.max(0, roundToTen(highExposureWork * 0.143 + conservativeShift * 0.25));
  const furtherAssessment = Math.max(0, roundToTen(highExposureWork * 0.095 + conservativeShift * 0.2));
  const voluntaryReview = Math.max(0, highExposureWork - directRedeploy - reskillRedeploy - longerReskill - furtherAssessment);
  const projectedLandings = roundToTen(directRedeploy + reskillRedeploy * scenario.reskillPassRate / 100);

  return {
    priorityCohort,
    highExposureWork,
    lowerExposureWork,
    directRedeploy,
    reskillRedeploy,
    longerReskill,
    furtherAssessment,
    voluntaryReview,
    projectedLandings,
  };
}

export const formatCount = (value: number) => value.toLocaleString("en-US");