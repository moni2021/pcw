import type { CustomLabor } from '../../../types';

const customLabor: Omit<CustomLabor, 'workshopId'>[] = [
    // This file is now for charges UNIQUE to this workshop.
    // Common charges are handled in the workshop-data-loader.
];

export default customLabor;
