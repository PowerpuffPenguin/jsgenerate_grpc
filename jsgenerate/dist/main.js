"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsgenerate = exports.description = exports.tag = void 0;
const helper_1 = require("./helper");
const path_1 = require("path");
exports.tag = 'gateway db';
exports.description = 'google grpc frame template';
class Metadata {
    constructor(pkg, name, tag) {
        this.date = new Date();
        this.project_ = '';
        this.pkg_ = '';
        this.gateway = false;
        this.db = false;
        this.grpcPrefix = 'jsgenerate_';
        pkg = pkg.replace('.', '/').replace('@', '').replace('-', '_');
        pkg = pkg.replace('//', '/').replace('__', '_');
        this.pkg_ = pkg;
        name = name.replace('.', '').replace('@', '').replace('-', '_').replace('/', '');
        name = name.replace('__', '_');
        this.project_ = name;
        this.grpcPrefix += name;
        if (Array.isArray(tag)) {
            tag.forEach((v) => {
                if (v == 'gateway') {
                    this.gateway = true;
                }
                else if (v == 'db') {
                    this.db = true;
                }
            });
        }
    }
    get project() {
        return this.project_;
    }
    get pkg() {
        return this.pkg_;
    }
}
function jsgenerate(context) {
    const md = new Metadata(context.pkg, context.name, context.tag);
    const exclude = ['.git'];
    if (!md.db) {
        exclude.push(path_1.join('configure', 'db.go'));
    }
    const nameService = new helper_1.NameService(context.output, new helper_1.Exclude(['.git/'], [], exclude)).rename(`${md.project}.jsonnet`, `example.jsonnet`, `bin`);
    context.serve(async function (name, src, stat) {
        if (nameService.checkExclude(name)) {
            return;
        }
        const filename = nameService.getOutput(name);
        // if (existsSync(filename)) {
        //     throw new Error(`file exists : ${filename}`);
        // }
        if (nameService.isTemplate(name)) {
            const text = context.template(src, md);
            context.writeFile(filename, text, stat.mode);
        }
        else {
            await context.copyFile(filename, src, stat.mode);
        }
    }, async function (name, _, stat) {
        if (nameService.checkExclude(name)) {
            return;
        }
        const filename = nameService.getOutput(name);
        await context.mkdir(filename, true, stat.mode);
    });
}
exports.jsgenerate = jsgenerate;
