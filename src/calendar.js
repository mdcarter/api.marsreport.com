const { sin, cos } = require('./helpers')

const j2000 = 2440587.5 + (new Date().getTime() / 8.64E7) + (35 + 32.184) / 86400 - 2451545.0
const meanAnomaly = (19.3870 + 0.52402075 * j2000) % 360
const fictitiousMeanSun = (270.3863 + 0.52403840 * j2000) % 360
const pbs = 0.0071 * cos((0.985626 * j2000 / 2.2353) + 49.409) +
    0.0057 * cos((0.985626 * j2000 / 2.7543) + 168.173) +
    0.0039 * cos((0.985626 * j2000 / 1.1177) + 191.837) +
    0.0037 * cos((0.985626 * j2000 / 15.7866) + 21.736) +
    0.0021 * cos((0.985626 * j2000 / 2.1354) + 15.704) +
    0.0020 * cos((0.985626 * j2000 / 2.4694) + 95.528) +
    0.0018 * cos((0.985626 * j2000 / 32.8493) + 49.095)
const nuM = (10.691 + 3.0E-7 * j2000) * sin(meanAnomaly) +
    0.623 * sin(2 * meanAnomaly) +
    0.050 * sin(3 * meanAnomaly) +
    0.005 * sin(4 * meanAnomaly) +
    0.0005 * sin(5 * meanAnomaly) + pbs

module.exports.solarLongitude = (fictitiousMeanSun + nuM) % 360
module.exports.marsSolDate = (((j2000 - 4.5) / 1.027491252) + 44796.0 - 0.00096)
