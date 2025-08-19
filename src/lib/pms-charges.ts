
import { PmsCharge } from './types';
import { workshops } from './workshops-data';

const defaultCharges: Omit<PmsCharge, 'workshopId'>[] = [
    // Paid Service (20,000 km)
    { model: 'Alto 800', labourDesc: 'Paid Service (20,000 km)', labourCode: 'L4020050', basicAmt: 1435 },
    { model: 'Alto K10', labourDesc: 'Paid Service (20,000 km)', labourCode: 'L4020050', basicAmt: 1435 },
    { model: 'S-Presso', labourDesc: 'Paid Service (20,000 km)', labourCode: 'L4020050', basicAmt: 1435 },
    { model: 'Celerio', labourDesc: 'Paid Service (20,000 km)', labourCode: 'L4020050', basicAmt: 1435 },
    { model: 'Wagon R', labourDesc: 'Paid Service (20,000 km)', labourCode: 'L4020050', basicAmt: 1435 },
    { model: 'Ignis', labourDesc: 'Paid Service (20,000 km)', labourCode: 'L4020050', basicAmt: 1440 },
    { model: 'Ritz', labourDesc: 'Paid Service (20,000 km)', labourCode: 'L4020050', basicAmt: 1515 }, // Price not in image, kept old
    { model: 'Swift', labourDesc: 'Paid Service (20,000 km)', labourCode: 'L4020050', basicAmt: 1490 },
    { model: 'Dzire', labourDesc: 'Paid Service (20,000 km)', labourCode: 'L4020050', basicAmt: 1490 },
    { model: 'Baleno', labourDesc: 'Paid Service (20,000 km)', labourCode: 'L4020050', basicAmt: 1475 },
    { model: 'Eeco', labourDesc: 'Paid Service (20,000 km)', labourCode: 'L4020050', basicAmt: 1255 },
    { model: 'Ertiga', labourDesc: 'Paid Service (20,000 km)', labourCode: 'L4020050', basicAmt: 1675 },
    { model: 'Brezza', labourDesc: 'Paid Service (20,000 km)', labourCode: 'L4020050', basicAmt: 1630 },
    { model: 'S-Cross', labourDesc: 'Paid Service (20,000 km)', labourCode: 'L4020050', basicAmt: 1640 }, // Price not in image, kept old
    { model: 'Ciaz', labourDesc: 'Paid Service (20,000 km)', labourCode: 'L4020050', basicAmt: 1590 },
    { model: 'XL6', labourDesc: 'Paid Service (20,000 km)', labourCode: 'L4020050', basicAmt: 1700 }, // Price not in image, kept old
    { model: 'Fronx', labourDesc: 'Paid Service (20,000 km)', labourCode: 'L4020050', basicAmt: 1430 },
    { model: 'Grand Vitara', labourDesc: 'Paid Service (20,000 km)', labourCode: 'L4020050', basicAmt: 1695 }, // Price not in image, kept old
    { model: 'Jimny', labourDesc: 'Paid Service (20,000 km)', labourCode: 'L4020050', basicAmt: 1455 }, // From 2P 30K as 20k was not available
    { model: 'Invicto', labourDesc: 'Paid Service (20,000 km)', labourCode: 'L4020050', basicAmt: 1845 }, // Price not in image, kept old
    { model: 'Super Carry', labourDesc: 'Paid Service (20,000 km)', labourCode: 'L4020050', basicAmt: 600 }, // Price not in image, kept old
    { model: 'Eeco Cargo', labourDesc: 'Paid Service (20,000 km)', labourCode: 'L4020050', basicAmt: 1255 },

    // Paid Service (30,000 km)
    { model: 'Alto 800', labourDesc: 'Paid Service (30,000 km)', labourCode: 'L4030050', basicAmt: 1335 },
    { model: 'Alto K10', labourDesc: 'Paid Service (30,000 km)', labourCode: 'L4030050', basicAmt: 1410 },
    { model: 'S-Presso', labourDesc: 'Paid Service (30,000 km)', labourCode: 'L4030050', basicAmt: 1335 },
    { model: 'Celerio', labourDesc: 'Paid Service (30,000 km)', labourCode: 'L4030050', basicAmt: 1335 },
    { model: 'Wagon R', labourDesc: 'Paid Service (30,000 km)', labourCode: 'L4030050', basicAmt: 1335 },
    { model: 'Ignis', labourDesc: 'Paid Service (30,000 km)', labourCode: 'L4030050', basicAmt: 1410 },
    { model: 'Ritz', labourDesc: 'Paid Service (30,000 km)', labourCode: 'L4030050', basicAmt: 1515 }, // Price not in image, kept old
    { model: 'Swift', labourDesc: 'Paid Service (30,000 km)', labourCode: 'L4030050', basicAmt: 1465 },
    { model: 'Dzire', labourDesc: 'Paid Service (30,000 km)', labourCode: 'L4030050', basicAmt: 1410 },
    { model: 'Baleno', labourDesc: 'Paid Service (30,000 km)', labourCode: 'L4030050', basicAmt: 1500 },
    { model: 'Eeco', labourDesc: 'Paid Service (30,000 km)', labourCode: 'L4030050', basicAmt: 1275 },
    { model: 'Ertiga', labourDesc: 'Paid Service (30,000 km)', labourCode: 'L4030050', basicAmt: 1660 },
    { model: 'Brezza', labourDesc: 'Paid Service (30,000 km)', labourCode: 'L4030050', basicAmt: 1655 },
    { model: 'S-Cross', labourDesc: 'Paid Service (30,000 km)', labourCode: 'L4030050', basicAmt: 1640 }, // Price not in image, kept old
    { model: 'Ciaz', labourDesc: 'Paid Service (30,000 km)', labourCode: 'L4030050', basicAmt: 1590 }, // Price from 2P, assuming it covers 30k
    { model: 'XL6', labourDesc: 'Paid Service (30,000 km)', labourCode: 'L4030050', basicAmt: 1660 }, // Price from New Ertiga
    { model: 'Fronx', labourDesc: 'Paid Service (30,000 km)', labourCode: 'L4030050', basicAmt: 1455 },
    { model: 'Grand Vitara', labourDesc: 'Paid Service (30,000 km)', labourCode: 'L4030050', basicAmt: 1695 }, // Price not in image, kept old
    { model: 'Jimny', labourDesc: 'Paid Service (30,000 km)', labourCode: 'L4030050', basicAmt: 1455 },
    { model: 'Invicto', labourDesc: 'Paid Service (30,000 km)', labourCode: 'L4030050', basicAmt: 1845 }, // Price not in image, kept old
    { model: 'Super Carry', labourDesc: 'Paid Service (30,000 km)', labourCode: 'L4030050', basicAmt: 600 }, // Price not in image, kept old
    { model: 'Eeco Cargo', labourDesc: 'Paid Service (30,000 km)', labourCode: 'L4030050', basicAmt: 1275 },

    // Paid Service (40,000 km)
    { model: 'Alto 800', labourDesc: 'Paid Service (40,000 km)', labourCode: 'L4040050', basicAmt: 1435 },
    { model: 'Alto K10', labourDesc: 'Paid Service (40,000 km)', labourCode: 'L4040050', basicAmt: 1435 },
    { model: 'S-Presso', labourDesc: 'Paid Service (40,000 km)', labourCode: 'L4040050', basicAmt: 1435 },
    { model: 'Celerio', labourDesc: 'Paid Service (40,000 km)', labourCode: 'L4040050', basicAmt: 1435 },
    { model: 'Wagon R', labourDesc: 'Paid Service (40,000 km)', labourCode: 'L4040050', basicAmt: 1435 },
    { model: 'Ignis', labourDesc: 'Paid Service (40,000 km)', labourCode: 'L4040050', basicAmt: 1515 },
    { model: 'Ritz', labourDesc: 'Paid Service (40,000 km)', labourCode: 'L4040050', basicAmt: 1515 }, // Price not in image, kept old
    { model: 'Swift', labourDesc: 'Paid Service (40,000 km)', labourCode: 'L4040050', basicAmt: 1490 },
    { model: 'Dzire', labourDesc: 'Paid Service (40,000 km)', labourCode: 'L4040050', basicAmt: 1490 },
    { model: 'Baleno', labourDesc: 'Paid Service (40,000 km)', labourCode: 'L4040050', basicAmt: 1500 },
    { model: 'Eeco', labourDesc: 'Paid Service (40,000 km)', labourCode: 'L4040050', basicAmt: 1320 },
    { model: 'Ertiga', labourDesc: 'Paid Service (40,000 km)', labourCode: 'L4040050', basicAmt: 1675 },
    { model: 'Brezza', labourDesc: 'Paid Service (40,000 km)', labourCode: 'L4040050', basicAmt: 1655 },
    { model: 'S-Cross', labourDesc: 'Paid Service (40,000 km)', labourCode: 'L4040050', basicAmt: 1640 }, // Price not in image, kept old
    { model: 'Ciaz', labourDesc: 'Paid Service (40,000 km)', labourCode: 'L4040050', basicAmt: 1590 },
    { model: 'XL6', labourDesc: 'Paid Service (40,000 km)', labourCode: 'L4040050', basicAmt: 1700 }, // Price not in image, kept old
    { model: 'Fronx', labourDesc: 'Paid Service (40,000 km)', labourCode: 'L4040050', basicAmt: 1500 },
    { model: 'Grand Vitara', labourDesc: 'Paid Service (40,000 km)', labourCode: 'L4040050', basicAmt: 2120 }, // Price not in image, kept old
    { model: 'Jimny', labourDesc: 'Paid Service (40,000 km)', labourCode: 'L4040050', basicAmt: 1845 }, // Price not in image, kept old
    { model: 'Invicto', labourDesc: 'Paid Service (40,000 km)', labourCode: 'L4040050', basicAmt: 2280 }, // Price not in image, kept old
    { model: 'Super Carry', labourDesc: 'Paid Service (40,000 km)', labourCode: 'L4040050', basicAmt: 600 }, // Price not in image, kept old
    { model: 'Eeco Cargo', labourDesc: 'Paid Service (40,000 km)', labourCode: 'L4040050', basicAmt: 1320 },
    
    // Paid Service (50,000 km)
    { model: 'Alto 800', labourDesc: 'Paid Service (50,000 km)', labourCode: 'L4050050', basicAmt: 1335 },
    { model: 'Alto K10', labourDesc: 'Paid Service (50,000 km)', labourCode: 'L4050050', basicAmt: 1480 },
    { model: 'S-Presso', labourDesc: 'Paid Service (50,000 km)', labourCode: 'L4050050', basicAmt: 1335 },
    { model: 'Celerio', labourDesc: 'Paid Service (50,000 km)', labourCode: 'L4050050', basicAmt: 1335 },
    { model: 'Wagon R', labourDesc: 'Paid Service (50,000 km)', labourCode: 'L4050050', basicAmt: 1480 },
    { model: 'Ignis', labourDesc: 'Paid Service (50,000 km)', labourCode: 'L4050050', basicAmt: 1410 },
    { model: 'Ritz', labourDesc: 'Paid Service (50,000 km)', labourCode: 'L4050050', basicAmt: 1515 }, // Price not in image, kept old
    { model: 'Swift', labourDesc: 'Paid Service (50,000 km)', labourCode: 'L4050050', basicAmt: 1535 },
    { model: 'Dzire', labourDesc: 'Paid Service (50,000 km)', labourCode: 'L4050050', basicAmt: 1410 },
    { model: 'Baleno', labourDesc: 'Paid Service (50,000 km)', labourCode: 'L4050050', basicAmt: 1520 },
    { model: 'Eeco', labourDesc: 'Paid Service (50,000 km)', labourCode: 'L4050050', basicAmt: 1340 },
    { model: 'Ertiga', labourDesc: 'Paid Service (50,000 km)', labourCode: 'L4050050', basicAmt: 1605 },
    { model: 'Brezza', labourDesc: 'Paid Service (50,000 km)', labourCode: 'L4050050', basicAmt: 1675 },
    { model: 'S-Cross', labourDesc: 'Paid Service (50,000 km)', labourCode: 'L4050050', basicAmt: 1640 }, // Price not in image, kept old
    { model: 'Ciaz', labourDesc: 'Paid Service (50,000 km)', labourCode: 'L4050050', basicAmt: 1615 }, // Price not in image, kept old
    { model: 'XL6', labourDesc: 'Paid Service (50,000 km)', labourCode: 'L4050050', basicAmt: 1700 }, // Price not in image, kept old
    { model: 'Fronx', labourDesc: 'Paid Service (50,000 km)', labourCode: 'L4050050', basicAmt: 1500 },
    { model: 'Grand Vitara', labourDesc: 'Paid Service (50,000 km)', labourCode: 'L4050050', basicAmt: 1695 }, // Price not in image, kept old
    { model: 'Jimny', labourDesc: 'Paid Service (50,000 km)', labourCode: 'L4050050', basicAmt: 1530 },
    { model: 'Invicto', labourDesc: 'Paid Service (50,000 km)', labourCode: 'L4050050', basicAmt: 1845 }, // Price not in image, kept old
    { model: 'Super Carry', labourDesc: 'Paid Service (50,000 km)', labourCode: 'L4050050', basicAmt: 600 }, // Price not in image, kept old
    { model: 'Eeco Cargo', labourDesc: 'Paid Service (50,000 km)', labourCode: 'L4050050', basicAmt: 1340 },

    // Paid Service (60,000 km)
    { model: 'Alto 800', labourDesc: 'Paid Service (60,000 km)', labourCode: 'L4060050', basicAmt: 1435 },
    { model: 'Alto K10', labourDesc: 'Paid Service (60,000 km)', labourCode: 'L4060050', basicAmt: 1435 },
    { model: 'S-Presso', labourDesc: 'Paid Service (60,000 km)', labourCode: 'L4060050', basicAmt: 1435 },
    { model: 'Celerio', labourDesc: 'Paid Service (60,000 km)', labourCode: 'L4060050', basicAmt: 1435 },
    { model: 'Wagon R', labourDesc: 'Paid Service (60,000 km)', labourCode: 'L4060050', basicAmt: 1435 },
    { model: 'Ignis', labourDesc: 'Paid Service (60,000 km)', labourCode: 'L4060050', basicAmt: 1515 },
    { model: 'Ritz', labourDesc: 'Paid Service (60,000 km)', labourCode: 'L4060050', basicAmt: 1515 }, // Price not in image, kept old
    { model: 'Swift', labourDesc: 'Paid Service (60,000 km)', labourCode: 'L4060050', basicAmt: 1490 },
    { model: 'Dzire', labourDesc: 'Paid Service (60,000 km)', labourCode: 'L4060050', basicAmt: 1490 },
    { model: 'Baleno', labourDesc: 'Paid Service (60,000 km)', labourCode: 'L4060050', basicAmt: 1500 },
    { model: 'Eeco', labourDesc: 'Paid Service (60,000 km)', labourCode: 'L4060050', basicAmt: 1320 },
    { model: 'Ertiga', labourDesc: 'Paid Service (60,000 km)', labourCode: 'L4060050', basicAmt: 1675 },
    { model: 'Brezza', labourDesc: 'Paid Service (60,000 km)', labourCode: 'L4060050', basicAmt: 1655 },
    { model: 'S-Cross', labourDesc: 'Paid Service (60,000 km)', labourCode: 'L4060050', basicAmt: 1640 }, // Price not in image, kept old
    { model: 'Ciaz', labourDesc: 'Paid Service (60,000 km)', labourCode: 'L4060050', basicAmt: 1590 },
    { model: 'XL6', labourDesc: 'Paid Service (60,000 km)', labourCode: 'L4060050', basicAmt: 1700 }, // Price not in image, kept old
    { model: 'Fronx', labourDesc: 'Paid Service (60,000 km)', labourCode: 'L4060050', basicAmt: 1500 },
    { model: 'Grand Vitara', labourDesc: 'Paid Service (60,000 km)', labourCode: 'L4060050', basicAmt: 1870 }, // Price not in image, kept old
    { model: 'Jimny', labourDesc: 'Paid Service (60,000 km)', labourCode: 'L4060050', basicAmt: 2170 }, // Price not in image, kept old
    { model: 'Invicto', labourDesc: 'Paid Service (60,000 km)', labourCode: 'L4060050', basicAmt: 2010 }, // Price not in image, kept old
    { model: 'Super Carry', labourDesc: 'Paid Service (60,000 km)', labourCode: 'L4060050', basicAmt: 600 }, // Price not in image, kept old
    { model: 'Eeco Cargo', labourDesc: 'Paid Service (60,000 km)', labourCode: 'L4060050', basicAmt: 1320 },

    // Paid Service (70,000 km)
    { model: 'Alto 800', labourDesc: 'Paid Service (70,000 km)', labourCode: 'L4070050', basicAmt: 1335 },
    { model: 'Alto K10', labourDesc: 'Paid Service (70,000 km)', labourCode: 'L4070050', basicAmt: 1480 },
    { model: 'S-Presso', labourDesc: 'Paid Service (70,000 km)', labourCode: 'L4070050', basicAmt: 1335 },
    { model: 'Celerio', labourDesc: 'Paid Service (70,000 km)', labourCode: 'L4070050', basicAmt: 1335 },
    { model: 'Wagon R', labourDesc: 'Paid Service (70,000 km)', labourCode: 'L4070050', basicAmt: 1480 },
    { model: 'Ignis', labourDesc: 'Paid Service (70,000 km)', labourCode: 'L4070050', basicAmt: 1410 },
    { model: 'Ritz', labourDesc: 'Paid Service (70,000 km)', labourCode: 'L4070050', basicAmt: 1515 }, // Price not in image, kept old
    { model: 'Swift', labourDesc: 'Paid Service (70,000 km)', labourCode: 'L4070050', basicAmt: 1535 },
    { model: 'Dzire', labourDesc: 'Paid Service (70,000 km)', labourCode: 'L4070050', basicAmt: 1410 },
    { model: 'Baleno', labourDesc: 'Paid Service (70,000 km)', labourCode: 'L4070050', basicAmt: 1520 },
    { model: 'Eeco', labourDesc: 'Paid Service (70,000 km)', labourCode: 'L4070050', basicAmt: 1340 },
    { model: 'Ertiga', labourDesc: 'Paid Service (70,000 km)', labourCode: 'L4070050', basicAmt: 1605 },
    { model: 'Brezza', labourDesc: 'Paid Service (70,000 km)', labourCode: 'L4070050', basicAmt: 1675 },
    { model: 'S-Cross', labourDesc: 'Paid Service (70,000 km)', labourCode: 'L4070050', basicAmt: 1640 }, // Price not in image, kept old
    { model: 'Ciaz', labourDesc: 'Paid Service (70,000 km)', labourCode: 'L4070050', basicAmt: 1615 }, // Price not in image, kept old
    { model: 'XL6', labourDesc: 'Paid Service (70,000 km)', labourCode: 'L4070050', basicAmt: 1700 }, // Price not in image, kept old
    { model: 'Fronx', labourDesc: 'Paid Service (70,000 km)', labourCode: 'L4070050', basicAmt: 1500 },
    { model: 'Grand Vitara', labourDesc: 'Paid Service (70,000 km)', labourCode: 'L4070050', basicAmt: 1695 }, // Price not in image, kept old
    { model: 'Jimny', labourDesc: 'Paid Service (70,000 km)', labourCode: 'L4070050', basicAmt: 1530 },
    { model: 'Invicto', labourDesc: 'Paid Service (70,000 km)', labourCode: 'L4070050', basicAmt: 1845 }, // Price not in image, kept old
    { model: 'Super Carry', labourDesc: 'Paid Service (70,000 km)', labourCode: 'L4070050', basicAmt: 600 }, // Price not in image, kept old
    { model: 'Eeco Cargo', labourDesc: 'Paid Service (70,000 km)', labourCode: 'L4070050', basicAmt: 1340 },

    // Paid Service (80,000 km)
    { model: 'Alto 800', labourDesc: 'Paid Service (80,000 km)', labourCode: 'L4080050', basicAmt: 1435 },
    { model: 'Alto K10', labourDesc: 'Paid Service (80,000 km)', labourCode: 'L4080050', basicAmt: 1435 },
    { model: 'S-Presso', labourDesc: 'Paid Service (80,000 km)', labourCode: 'L4080050', basicAmt: 1435 },
    { model: 'Celerio', labourDesc: 'Paid Service (80,000 km)', labourCode: 'L4080050', basicAmt: 1435 },
    { model: 'Wagon R', labourDesc: 'Paid Service (80,000 km)', labourCode: 'L4080050', basicAmt: 1435 },
    { model: 'Ignis', labourDesc: 'Paid Service (80,000 km)', labourCode: 'L4080050', basicAmt: 1515 },
    { model: 'Ritz', labourDesc: 'Paid Service (80,000 km)', labourCode: 'L4080050', basicAmt: 1515 }, // Price not in image, kept old
    { model: 'Swift', labourDesc: 'Paid Service (80,000 km)', labourCode: 'L4080050', basicAmt: 1490 },
    { model: 'Dzire', labourDesc: 'Paid Service (80,000 km)', labourCode: 'L4080050', basicAmt: 1490 },
    { model: 'Baleno', labourDesc: 'Paid Service (80,000 km)', labourCode: 'L4080050', basicAmt: 1500 },
    { model: 'Eeco', labourDesc: 'Paid Service (80,000 km)', labourCode: 'L4080050', basicAmt: 1320 },
    { model: 'Ertiga', labourDesc: 'Paid Service (80,000 km)', labourCode: 'L4080050', basicAmt: 1675 },
    { model: 'Brezza', labourDesc: 'Paid Service (80,000 km)', labourCode: 'L4080050', basicAmt: 1655 },
    { model: 'S-Cross', labourDesc: 'Paid Service (80,000 km)', labourCode: 'L4080050', basicAmt: 1640 }, // Price not in image, kept old
    { model: 'Ciaz', labourDesc: 'Paid Service (80,000 km)', labourCode: 'L4080050', basicAmt: 1590 },
    { model: 'XL6', labourDesc: 'Paid Service (80,000 km)', labourCode: 'L4080050', basicAmt: 1700 }, // Price not in image, kept old
    { model: 'Fronx', labourDesc: 'Paid Service (80,000 km)', labourCode: 'L4080050', basicAmt: 1500 },
    { model: 'Grand Vitara', labourDesc: 'Paid Service (80,000 km)', labourCode: 'L4080050', basicAmt: 2280 }, // Price not in image, kept old
    { model: 'Jimny', labourDesc: 'Paid Service (80,000 km)', labourCode: 'L4080050', basicAmt: 1845 }, // Price not in image, kept old
    { model: 'Invicto', labourDesc: 'Paid Service (80,000 km)', labourCode: 'L4080050', basicAmt: 2420 }, // Price not in image, kept old
    { model: 'Super Carry', labourDesc: 'Paid Service (80,000 km)', labourCode: 'L4080050', basicAmt: 600 }, // Price not in image, kept old
    { model: 'Eeco Cargo', labourDesc: 'Paid Service (80,000 km)', labourCode: 'L4080050', basicAmt: 1320 },

    // Paid Service (90,000 km)
    { model: 'Alto 800', labourDesc: 'Paid Service (90,000 km)', labourCode: 'L4090050', basicAmt: 1335 },
    { model: 'Alto K10', labourDesc: 'Paid Service (90,000 km)', labourCode: 'L4090050', basicAmt: 1335 },
    { model: 'S-Presso', labourDesc: 'Paid Service (90,000 km)', labourCode: 'L4090050', basicAmt: 1335 },
    { model: 'Celerio', labourDesc: 'Paid Service (90,000 km)', labourCode: 'L4090050', basicAmt: 1335 },
    { model: 'Wagon R', labourDesc: 'Paid Service (90,000 km)', labourCode: 'L4090050', basicAmt: 1335 },
    { model: 'Ignis', labourDesc: 'Paid Service (90,000 km)', labourCode: 'L4090050', basicAmt: 1410 },
    { model: 'Ritz', labourDesc: 'Paid Service (90,000 km)', labourCode: 'L4090050', basicAmt: 1515 }, // Price not in image, kept old
    { model: 'Swift', labourDesc: 'Paid Service (90,000 km)', labourCode: 'L4090050', basicAmt: 1410 },
    { model: 'Dzire', labourDesc: 'Paid Service (90,000 km)', labourCode: 'L4090050', basicAmt: 1410 },
    { model: 'Baleno', labourDesc: 'Paid Service (90,000 km)', labourCode: 'L4090050', basicAmt: 1400 },
    { model: 'Eeco', labourDesc: 'Paid Service (90,000 km)', labourCode: 'L4090050', basicAmt: 1180 },
    { model: 'Ertiga', labourDesc: 'Paid Service (90,000 km)', labourCode: 'L4090050', basicAmt: 1605 },
    { model: 'Brezza', labourDesc: 'Paid Service (90,000 km)', labourCode: 'L4090050', basicAmt: 1530 },
    { model: 'S-Cross', labourDesc: 'Paid Service (90,000 km)', labourCode: 'L4090050', basicAmt: 1640 }, // Price not in image, kept old
    { model: 'Ciaz', labourDesc: 'Paid Service (90,000 km)', labourCode: 'L4090050', basicAmt: 1615 }, // Price not in image, kept old
    { model: 'XL6', labourDesc: 'Paid Service (90,000 km)', labourCode: 'L4090050', basicAmt: 1700 }, // Price not in image, kept old
    { model: 'Fronx', labourDesc: 'Paid Service (90,000 km)', labourCode: 'L4090050', basicAmt: 1500 },
    { model: 'Grand Vitara', labourDesc: 'Paid Service (90,000 km)', labourCode: 'L4090050', basicAmt: 1695 }, // Price not in image, kept old
    { model: 'Jimny', labourDesc: 'Paid Service (90,000 km)', labourCode: 'L4090050', basicAmt: 1530 },
    { model: 'Invicto', labourDesc: 'Paid Service (90,000 km)', labourCode: 'L4090050', basicAmt: 1845 }, // Price not in image, kept old
    { model: 'Super Carry', labourDesc: 'Paid Service (90,000 km)', labourCode: 'L4090050', basicAmt: 600 }, // Price not in image, kept old
    { model: 'Eeco Cargo', labourDesc: 'Paid Service (90,000 km)', labourCode: 'L4090050', basicAmt: 1180 },

    // Paid Service (100,000 km)
    { model: 'Alto 800', labourDesc: 'Paid Service (100,000 km)', labourCode: 'L4100050', basicAmt: 1335 },
    { model: 'Alto K10', labourDesc: 'Paid Service (100,000 km)', labourCode: 'L4100050', basicAmt: 1480 },
    { model: 'S-Presso', labourDesc: 'Paid Service (100,000 km)', labourCode: 'L4100050', basicAmt: 1335 },
    { model: 'Celerio', labourDesc: 'Paid Service (100,000 km)', labourCode: 'L4100050', basicAmt: 1335 },
    { model: 'Wagon R', labourDesc: 'Paid Service (100,000 km)', labourCode: 'L4100050', basicAmt: 1480 },
    { model: 'Ignis', labourDesc: 'Paid Service (100,000 km)', labourCode: 'L4100050', basicAmt: 1410 },
    { model: 'Ritz', labourDesc: 'Paid Service (100,000 km)', labourCode: 'L4100050', basicAmt: 1515 }, // Price not in image, kept old
    { model: 'Swift', labourDesc: 'Paid Service (100,000 km)', labourCode: 'L4100050', basicAmt: 1535 },
    { model: 'Dzire', labourDesc: 'Paid Service (100,000 km)', labourCode: 'L4100050', basicAmt: 1410 },
    { model: 'Baleno', labourDesc: 'Paid Service (100,000 km)', labourCode: 'L4100050', basicAmt: 1520 },
    { model: 'Eeco', labourDesc: 'Paid Service (100,000 km)', labourCode: 'L4100050', basicAmt: 1340 },
    { model: 'Ertiga', labourDesc: 'Paid Service (100,000 km)', labourCode: 'L4100050', basicAmt: 1605 },
    { model: 'Brezza', labourDesc: 'Paid Service (100,000 km)', labourCode: 'L4100050', basicAmt: 1675 },
    { model: 'S-Cross', labourDesc: 'Paid Service (100,000 km)', labourCode: 'L4100050', basicAmt: 1640 }, // Price not in image, kept old
    { model: 'Ciaz', labourDesc: 'Paid Service (100,000 km)', labourCode: 'L4100050', basicAmt: 1615 }, // Price not in image, kept old
    { model: 'XL6', labourDesc: 'Paid Service (100,000 km)', labourCode: 'L4100050', basicAmt: 1700 }, // Price not in image, kept old
    { model: 'Fronx', labourDesc: 'Paid Service (100,000 km)', labourCode: 'L4100050', basicAmt: 1500 },
    { model: 'Grand Vitara', labourDesc: 'Paid Service (100,000 km)', labourCode: 'L4100050', basicAmt: 1695 }, // Price not in image, kept old
    { model: 'Jimny', labourDesc: 'Paid Service (100,000 km)', labourCode: 'L4100050', basicAmt: 1530 },
    { model: 'Invicto', labourDesc: 'Paid Service (100,000 km)', labourCode: 'L4100050', basicAmt: 1845 }, // Price not in image, kept old
    { model: 'Super Carry', labourDesc: 'Paid Service (100,000 km)', labourCode: 'L4100050', basicAmt: 600 }, // Price not in image, kept old
    { model: 'Eeco Cargo', labourDesc: 'Paid Service (100,000 km)', labourCode: 'L4100050', basicAmt: 1340 },

    // Paid Service (110,000 km)
    { model: 'Alto 800', labourDesc: 'Paid Service (110,000 km)', labourCode: 'L4110050', basicAmt: 1335 },
    { model: 'Alto K10', labourDesc: 'Paid Service (110,000 km)', labourCode: 'L4110050', basicAmt: 1335 },
    { model: 'S-Presso', labourDesc: 'Paid Service (110,000 km)', labourCode: 'L4110050', basicAmt: 1335 },
    { model: 'Celerio', labourDesc: 'Paid Service (110,000 km)', labourCode: 'L4110050', basicAmt: 1335 },
    { model: 'Wagon R', labourDesc: 'Paid Service (110,000 km)', labourCode: 'L4110050', basicAmt: 1335 },
    { model: 'Ignis', labourDesc: 'Paid Service (110,000 km)', labourCode: 'L4110050', basicAmt: 1410 },
    { model: 'Ritz', labourDesc: 'Paid Service (110,000 km)', labourCode: 'L4110050', basicAmt: 1515 }, // Price not in image, kept old
    { model: 'Swift', labourDesc: 'Paid Service (110,000 km)', labourCode: 'L4110050', basicAmt: 1410 },
    { model: 'Dzire', labourDesc: 'Paid Service (110,000 km)', labourCode: 'L4110050', basicAmt: 1410 },
    { model: 'Baleno', labourDesc: 'Paid Service (110,000 km)', labourCode: 'L4110050', basicAmt: 1400 },
    { model: 'Eeco', labourDesc: 'Paid Service (110,000 km)', labourCode: 'L4110050', basicAmt: 1180 },
    { model: 'Ertiga', labourDesc: 'Paid Service (110,000 km)', labourCode: 'L4110050', basicAmt: 1605 },
    { model: 'Brezza', labourDesc: 'Paid Service (110,000 km)', labourCode: 'L4110050', basicAmt: 1530 },
    { model: 'S-Cross', labourDesc: 'Paid Service (110,000 km)', labourCode: 'L4110050', basicAmt: 1640 }, // Price not in image, kept old
    { model: 'Ciaz', labourDesc: 'Paid Service (110,000 km)', labourCode: 'L4110050', basicAmt: 1615 }, // Price not in image, kept old
    { model: 'XL6', labourDesc: 'Paid Service (110,000 km)', labourCode: 'L4110050', basicAmt: 1700 }, // Price not in image, kept old
    { model: 'Fronx', labourDesc: 'Paid Service (110,000 km)', labourCode: 'L4110050', basicAmt: 1500 },
    { model: 'Grand Vitara', labourDesc: 'Paid Service (110,000 km)', labourCode: 'L4110050', basicAmt: 1695 }, // Price not in image, kept old
    { model: 'Jimny', labourDesc: 'Paid Service (110,000 km)', labourCode: 'L4110050', basicAmt: 1530 },
    { model: 'Invicto', labourDesc: 'Paid Service (110,000 km)', labourCode: 'L4110050', basicAmt: 1845 }, // Price not in image, kept old
    { model: 'Super Carry', labourDesc: 'Paid Service (110,000 km)', labourCode: 'L4110050', basicAmt: 600 }, // Price not in image, kept old
    { model: 'Eeco Cargo', labourDesc: 'Paid Service (110,000 km)', labourCode: 'L4110050', basicAmt: 1180 },

    // Paid Service (120,000 km) - Values copied from 80k/40k
    { model: 'Alto 800', labourDesc: 'Paid Service (120,000 km)', labourCode: 'L4120050', basicAmt: 1435 },
    { model: 'Alto K10', labourDesc: 'Paid Service (120,000 km)', labourCode: 'L4120050', basicAmt: 1435 },
    { model: 'S-Presso', labourDesc: 'Paid Service (120,000 km)', labourCode: 'L4120050', basicAmt: 1435 },
    { model: 'Celerio', labourDesc: 'Paid Service (120,000 km)', labourCode: 'L4120050', basicAmt: 1435 },
    { model: 'Wagon R', labourDesc: 'Paid Service (120,000 km)', labourCode: 'L4120050', basicAmt: 1435 },
    { model: 'Ignis', labourDesc: 'Paid Service (120,000 km)', labourCode: 'L4120050', basicAmt: 1515 },
    { model: 'Ritz', labourDesc: 'Paid Service (120,000 km)', labourCode: 'L4120050', basicAmt: 1515 }, // Price not in image, kept old
    { model: 'Swift', labourDesc: 'Paid Service (120,000 km)', labourCode: 'L4120050', basicAmt: 1490 },
    { model: 'Dzire', labourDesc: 'Paid Service (120,000 km)', labourCode: 'L4120050', basicAmt: 1490 },
    { model: 'Baleno', labourDesc: 'Paid Service (120,000 km)', labourCode: 'L4120050', basicAmt: 1500 },
    { model: 'Eeco', labourDesc: 'Paid Service (120,000 km)', labourCode: 'L4120050', basicAmt: 1320 },
    { model: 'Ertiga', labourDesc: 'Paid Service (120,000 km)', labourCode: 'L4120050', basicAmt: 1675 },
    { model: 'Brezza', labourDesc: 'Paid Service (120,000 km)', labourCode: 'L4120050', basicAmt: 1655 },
    { model: 'S-Cross', labourDesc: 'Paid Service (120,000 km)', labourCode: 'L4120050', basicAmt: 1640 }, // Price not in image, kept old
    { model: 'Ciaz', labourDesc: 'Paid Service (120,000 km)', labourCode: 'L4120050', basicAmt: 1590 },
    { model: 'XL6', labourDesc: 'Paid Service (120,000 km)', labourCode: 'L4120050', basicAmt: 1700 }, // Price not in image, kept old
    { model: 'Fronx', labourDesc: 'Paid Service (120,000 km)', labourCode: 'L4120050', basicAmt: 1500 },
    { model: 'Grand Vitara', labourDesc: 'Paid Service (120,000 km)', labourCode: 'L4120050', basicAmt: 2120 }, // Price not in image, kept old
    { model: 'Jimny', labourDesc: 'Paid Service (120,000 km)', labourCode: 'L4120050', basicAmt: 2170 }, // Price not in image, kept old
    { model: 'Invicto', labourDesc: 'Paid Service (120,000 km)', labourCode: 'L4120050', basicAmt: 2280 }, // Price not in image, kept old
    { model: 'Super Carry', labourDesc: 'Paid Service (120,000 km)', labourCode: 'L4120050', basicAmt: 600 }, // Price not in image, kept old
    { model: 'Eeco Cargo', labourDesc: 'Paid Service (120,000 km)', labourCode: 'L4120050', basicAmt: 1320 },

    // Diesel Models - Adding some based on common patterns, can be expanded
    { model: 'Swift', labourDesc: 'Paid Service (30,000 km)', labourCode: 'L4030050', basicAmt: 1850 },
    { model: 'Swift', labourDesc: 'Paid Service (60,000 km)', labourCode: 'L4060050', basicAmt: 1850 },
    { model: 'Swift', labourDesc: 'Paid Service (90,000 km)', labourCode: 'L4090050', basicAmt: 1850 },
    { model: 'Dzire', labourDesc: 'Paid Service (30,000 km)', labourCode: 'L4030050', basicAmt: 1850 },
    { model: 'Dzire', labourDesc: 'Paid Service (60,000 km)', labourCode: 'L4060050', basicAmt: 1850 },
    { model: 'Dzire', labourDesc: 'Paid Service (90,000 km)', labourCode: 'L4090050', basicAmt: 1850 },
    { model: 'Ertiga', labourDesc: 'Paid Service (30,000 km)', labourCode: 'L4030050', basicAmt: 1890 }, // Price not in image, kept old
    { model: 'Ertiga', labourDesc: 'Paid Service (60,000 km)', labourCode: 'L4060050', basicAmt: 2100 }, // Price not in image, kept old
    { model: 'Ertiga', labourDesc: 'Paid Service (90,000 km)', labourCode: 'L4090050', basicAmt: 1890 }, // Copied from 30k
    { model: 'Brezza', labourDesc: 'Paid Service (30,000 km)', labourCode: 'L4030050', basicAmt: 1655 },
    { model: 'Brezza', labourDesc: 'Paid Service (60,000 km)', labourCode: 'L4060050', basicAmt: 1655 },
    { model: 'Brezza', labourDesc: 'Paid Service (90,000 km)', labourCode: 'L4090050', basicAmt: 1655 },
];

export const pmsCharges: PmsCharge[] = workshops.flatMap(workshop => 
    defaultCharges.map(charge => ({ ...charge, workshopId: workshop.id }))
);

// Helper function to find a charge, useful for debugging
export function findCharge(model: string, service: string, workshop: string) {
    return pmsCharges.find(c => c.model === model && c.labourDesc === service && c.workshopId === workshop);
}
