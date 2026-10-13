import { metroRoute, metroStations } from "@/data/rawalpindi/transport";

import styles from "./metro-route.module.css";

/** The SVG is decorative; the visible ordered HTML list carries every label. */
export function MetroRoute() {
  return (
    <div className={styles.route} data-metro-route>
      <div className={styles.routeHeading}>
        <p className={styles.direction}>
          <span>{metroRoute.terminals[0]}</span>
          <span aria-hidden="true">→</span>
          <span>{metroRoute.terminals[1]}</span>
        </p>
        <p className={styles.routeCount}>{metroRoute.stationCount} stations · Not to scale</p>
      </div>

      <p id="metro-route-instructions" className={styles.instructions}>
        Stations are numbered in route order, from Saddar to Pak Secretariat.
      </p>

      <div className={styles.diagram}>
        <svg
          aria-hidden="true"
          focusable="false"
          viewBox="0 0 800 504"
          preserveAspectRatio="none"
          className={styles.linework}
          data-metro-linework
        >
          <path
            d="M50 24H755Q795 24 795 64V152Q795 192 755 192H45Q5 192 5 232V320Q5 360 45 360H750"
            fill="none"
            stroke="currentColor"
            strokeWidth="5"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="m394 17 10 7-10 7m12 154-10 7 10 7m-12 154 10 7-10 7"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        <ol
          className={styles.stations}
          aria-label="Metrobus stations from Saddar to Pak Secretariat"
          aria-describedby="metro-route-instructions"
          role="list"
          data-metro-stations
        >
          {metroStations.map((station, index) => {
            const row = Math.floor(index / 8);
            const column = row % 2 === 0 ? index % 8 : 7 - (index % 8);
            const terminal = index === 0 || index === metroStations.length - 1;

            return (
              <li
                id={`station-${station.id}`}
                key={station.id}
                className={`${styles.station} ${terminal ? styles.terminal : ""}`.trim()}
                style={{ gridRow: row + 1, gridColumn: column + 1 }}
                data-metro-station
              >
                <span className={styles.marker} aria-hidden="true">
                  {String(station.order).padStart(2, "0")}
                </span>
                <div className={styles.stationLabel}>
                  <span className={styles.stationTitle}>{station.title}</span>
                  {terminal ? (
                    <span className={styles.terminalLabel}>
                      {index === 0 ? "Start terminal" : "End terminal"}
                    </span>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      <p className={styles.mapNote}>
        An original route schematic based on PMA’s published map. Station numbering shows
        sequence, not official station codes or distance.
      </p>
    </div>
  );
}
