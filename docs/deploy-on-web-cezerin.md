## 5. Install and Run Cezerin

Follow [this](https://github.com/Cezerin2/cezerin2/blob/master/docs/using-source-code.md) installation guide for local environment.
All the same for web deploy.

[Cezerin Installation Guide.](https://github.com/Cezerin2/cezerin2/blob/master/docs/using-source-code.md)

Cezerin apps must be running, console command:

```
pm2 list all
```

```
root@ubuntu-s-1vcpu-1gb-nyc3-01:~# pm2 list all
┌───────┬────┬──────┬────────┬───┬──────┬────────────┐
│ Name  │ id │ mode │ status │ ↺ │ cpu  │ memory     │
├───────┼────┼──────┼────────┼───┼──────┼────────────┤
│ admin │ 1  │ fork │ online │ 2 │ 0.4% │ 54.1 MB    │
│ api   │ 0  │ fork │ online │ 6 │ 0.9% │ 149.1 MB   │
│ store │ 2  │ fork │ online │ 2 │ 0.5% │ 139.4 MB   │
└───────┴────┴──────┴────────┴───┴──────┴────────────┘
```
