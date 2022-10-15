# VPN Gate Server List

A NodeJS script to get list of servers from VPN gate website.

By default it will try to call `https://www.vpngate.net`but user can change it by sending argument.

#### Install

```shell
npm install vpn-gate-server-list
```

#### Usage Example

```typescript
import {SerevrList, IServer} from 'vpn-gate-server-list';

const servers: IServer[] = await ServerList('https://www.vpngate.net');
```