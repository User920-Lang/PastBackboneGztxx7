// Mirrors the C# Tournament class from the game
const { v4: uuidv4 } = require('uuid');

const TournamentStatus = {
  UPCOMING: 0,
  REGISTRATION: 1,
  IN_PROGRESS: 2,
  FINISHED: 3,
  CANCELLED: 4,
  ACTIVE: 6, // same value as game's status=6
};

const TournamentType = {
  TESTING: 'TestingTournament',
  CLASSIC: 'ClassicTournament',
  RANKED: 'RankedTournament',
};

const PhaseType = {
  SINGLE_ELIMINATION: 'SingleEliminationBracket',
  ROUND_ROBIN: 'RoundRobin',
};

const UserStatus = {
  NONE: 0,
  INVITED: 1,
  REGISTERED: 2,
  ELIMINATED: 3,
  WINNER: 4,
};

function createRound(id, maxLength = 30, winScore = 1) {
  return { id, maxLength, winScore };
}

function createPhase(overrides = {}) {
  return {
    id: 1,
    type: PhaseType.SINGLE_ELIMINATION,
    maxLoses: 1,
    maxTeams: 128,
    maxPlayers: 2,
    rounds: [
      createRound(1),
      createRound(2),
      createRound(3),
      createRound(4),
      createRound(5),
    ],
    ...overrides,
  };
}

function createTournament(overrides = {}) {
  const now = new Date();
  const startTime = new Date(now.getTime() + 15 * 60 * 1000); // 15 min from now

  return {
    id: Date.now(),
    tournamentName: overrides.tournamentName || 'Classic Tournament',
    description: overrides.description || '',
    additionalDescription: '',
    imageUrl: overrides.imageUrl || '',
    iconUrl: overrides.iconUrl || '',
    sponsorImageUrl: overrides.sponsorImageUrl || '',
    themeColor: overrides.themeColor || '#FF0000',
    status: TournamentStatus.ACTIVE,
    type: TournamentType.CLASSIC,
    time: startTime.toISOString(),
    currentPhaseId: 1,
    phaseCount: 1,
    partySize: 1,
    phases: [createPhase()],
    winner: null,
    invite: {
      status: UserStatus.INVITED,
      finalPlace: 0,
    },
    hasAllDataLoaded: true,
    participants: [],
    createdAt: now.toISOString(),
    ...overrides,
  };
}

module.exports = {
  createTournament,
  createPhase,
  createRound,
  TournamentStatus,
  TournamentType,
  PhaseType,
  UserStatus,
};
