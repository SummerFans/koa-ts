import * as HTTP from 'http';
import * as HTTPS from 'https';
import * as qs from 'querystring';
import { Buffer } from 'buffer';
import CONF from '../config';

export class RequestHTTP {

    private host;
    private port;

    constructor(host: string, port: number) {
        this.host = host;
        this.port = port;
    }

    public get(opt) {
        let options = {
            hostname: this.host,
            port: this.port,
            path: opt.path,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        };

        if (opt.headers) {
            Object.assign(options.headers, opt.headers);
        }

        let client = { 443: HTTPS, 80: HTTP };

        return new Promise((resolve, reject) => {

            let timeout = setTimeout(() => {
                reject('Connection timed out!');
            }, CONF.REQUEST_TIMEOUT);

            let req = (client[options.port] ? client[options.port] : HTTP).request(options, (res) => {
                let dt = '';
                res.on('data', (chunk) => {
                    dt += chunk;
                });

                res.on('end', () => {
                    clearTimeout(timeout);
                    try {
                        let dtToObject = JSON.parse(dt);
                        resolve(dtToObject);
                    } catch (e) {
                        reject(e);
                    }
                });

                res.on('error', (e) => {
                    clearTimeout(timeout);
                    reject(e);
                });
            });
            req.on('error', (e) => {
                clearTimeout(timeout);
                reject(e);
            });
            req.end();
        });
    }

    public post(opt, data) {
        let options = {
            hostname: this.host,
            port: this.port,
            path: opt.path,
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        // 加入自定义头信息
        if (opt.headers) {
            Object.assign(options.headers, opt.headers);
        }
        let client = { 443: HTTPS, 80: HTTP };

        return new Promise((resolve, reject) => {

            let timeout = setTimeout(() => {
                reject('Connection timed out!');
            }, CONF.REQUEST_TIMEOUT);

            let req = (client[options.port] ? client[options.port] : HTTP).request(options, (res) => {
                let dt = '';
                res.on('data', (chunk) => {
                    dt += chunk;
                });

                res.on('end', () => {
                    clearTimeout(timeout);
                    // console.log(dt);
                    try {
                        let dtToObject = JSON.parse(dt);
                        resolve(dtToObject);
                    } catch (e) {
                        reject(e);
                    }
                });

                res.on('error', (e) => {
                    clearTimeout(timeout);
                    reject(e);
                });
            });
            req.on('error', (e) => {
                clearTimeout(timeout);
                reject(e);
            });
            req.end(qs.stringify(data));
        });

    }

    public put(opt, data) {
        let options = {
            hostname: this.host,
            port: this.port,
            path: opt.path,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(data, 'utf8')
            }
        };

        // 加入自定义头信息
        if (opt.headers) {
            Object.assign(options.headers, opt.headers);
        }

        let client = { 443: HTTPS, 80: HTTP };

        return new Promise((resolve, reject) => {

            let timeout = setTimeout(() => {
                reject('Connection timed out!');
            }, CONF.REQUEST_TIMEOUT);

            let req = (client[options.port] ? client[options.port] : HTTP).request(options, (res) => {
                let dt = '';
                res.on('data', (chunk) => {
                    dt += chunk;
                });

                res.on('end', () => {
                    clearTimeout(timeout);
                    try {
                        let dtToObject = JSON.parse(dt);
                        resolve(dtToObject);
                    } catch (e) {
                        reject(e);
                    }
                });

                res.on('error', (e) => {
                    clearTimeout(timeout);
                    reject(e);
                });
            });
            req.on('error', (e) => {
                clearTimeout(timeout);
                reject(e);
            });
            req.end(JSON.stringify(data));
        });
    }

    public del(opt) {
        let options = {
            hostname: this.host,
            port: this.port,
            path: opt.path,
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        // 加入自定义头信息
        if (opt.headers) {
            Object.assign(options.headers, opt.headers);
        }

        let client = { 443: HTTPS, 80: HTTP };

        return new Promise((resolve, reject) => {

            let timeout = setTimeout(() => {
                reject('Connection timed out!');
            }, CONF.REQUEST_TIMEOUT);

            let req = (client[options.port] ? client[options.port] : HTTP).request(options, (res) => {
                let dt = '';
                res.on('data', (chunk) => {
                    dt += chunk;
                });

                res.on('end', () => {
                    clearTimeout(timeout);
                    try {
                        let dtToObject = JSON.parse(dt);
                        resolve(dtToObject);
                    } catch (e) {
                        reject(e);
                    }
                });

                res.on('error', (e) => {
                    clearTimeout(timeout);
                    reject(e);
                });
            });
            req.on('error', (e) => {
                clearTimeout(timeout);
                reject(e);
            });
            req.end();
        });
    }
}
