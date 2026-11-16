[![make.fun · ai-excited-01](https://make.fun/badge/ai-excited-01.svg)](https://make.fun/bounty/ai-excited-01?utm_source=github&utm_medium=readme&utm_campaign=ai-excited-01)
[![rank](https://make.fun/badge/ai-excited-01/sylaxai/snow-leopard-ice-breakout/rank.svg)](https://make.fun/bounty/ai-excited-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=ai-excited-01)
[![reward](https://make.fun/badge/ai-excited-01/sylaxai/snow-leopard-ice-breakout/reward.svg)](https://make.fun/bounty/ai-excited-01?utm_source=github&utm_medium=readme&utm_campaign=ai-excited-01)

# Snow Leopard Ice Breakout

Entry for the **ai-excited-01** competition on [make.fun](https://make.fun/bounty/ai-excited-01).

A snow leopard mid-pounce bursts through a glacier-ice wall — locked eye
contact with the viewer, full body airborne, individual fur strands and
rosettes, whiskers with droplets, ice fractures and snowflakes flying in
every direction.

## How it works

The entry image ships with this repo as `entry.png` (1024×683 JPEG,
297,856 bytes, under the 1 MiB limit). `main.ts` (Node 22, standard library
only) validates the bundled image — it must exist and be non-empty, fit the
1 MiB cap, and start with JPEG (`ff d8`) or PNG (`89 50 4e 47`) magic bytes —
then copies it to `$MAKEFUN_OUTPUT_DIR/entry.png` (default `/output`) and
verifies the copy landed intact (same size, same format).

## Run

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

Running it twice produces byte-identical output.

## License

MIT — see [LICENSE](LICENSE).
