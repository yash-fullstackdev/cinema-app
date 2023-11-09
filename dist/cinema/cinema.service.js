"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CinemaService = void 0;
const common_1 = require("@nestjs/common");
let CinemaService = class CinemaService {
    create(createCinemaDto) {
        return 'This action adds a new cinema';
    }
    findAll() {
        return `This action returns all cinema`;
    }
    findOne(id) {
        return `This action returns a #${id} cinema`;
    }
    update(id, updateCinemaDto) {
        return `This action updates a #${id} cinema`;
    }
    remove(id) {
        return `This action removes a #${id} cinema`;
    }
};
CinemaService = __decorate([
    (0, common_1.Injectable)()
], CinemaService);
exports.CinemaService = CinemaService;
//# sourceMappingURL=cinema.service.js.map