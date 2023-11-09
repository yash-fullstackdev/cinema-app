"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CinemaController = void 0;
const common_1 = require("@nestjs/common");
const cinema_service_1 = require("./cinema.service");
const create_cinema_dto_1 = require("./dto/create-cinema.dto");
const swagger_1 = require("@nestjs/swagger");
const cinema_entity_1 = require("./entities/cinema.entity");
const update_seat_entity_1 = require("./entities/update-seat.entity");
const update_seat_dto_1 = require("./dto/update-seat.dto");
const get_consecutive_seats_entity_1 = require("./entities/get-consecutive-seats.entity");
let CinemaController = class CinemaController {
    constructor(cinemaService) {
        this.cinemaService = cinemaService;
    }
    async create(createCinemaDto) {
        return await this.cinemaService.create(createCinemaDto);
    }
    async purchaseSeat({ seatNumber }, { id: cinemaId }) {
        return await this.cinemaService.purchaseSeat(cinemaId, seatNumber);
    }
    async getConsecutiveSeats({ id: cinemaId }) {
        return await this.cinemaService.getConsecutiveSeats(cinemaId);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiCreatedResponse)({ type: cinema_entity_1.CinemaEntity }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_cinema_dto_1.CreateCinemaDto]),
    __metadata("design:returntype", Promise)
], CinemaController.prototype, "create", null);
__decorate([
    (0, common_1.Post)(":id/purchase-seat"),
    (0, swagger_1.ApiOkResponse)({ type: update_seat_entity_1.UpdateSeatEntity }),
    (0, swagger_1.ApiParam)({ type: String, name: "id" }),
    (0, swagger_1.ApiBody)({ type: update_seat_dto_1.UpdateSeatDto }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_seat_dto_1.UpdateSeatDto, Object]),
    __metadata("design:returntype", Promise)
], CinemaController.prototype, "purchaseSeat", null);
__decorate([
    (0, common_1.Get)(":id/consecutive-seats"),
    (0, swagger_1.ApiOkResponse)({ type: get_consecutive_seats_entity_1.GetConsecutiveSeatEntity }),
    (0, swagger_1.ApiParam)({ type: String, name: "id" }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CinemaController.prototype, "getConsecutiveSeats", null);
CinemaController = __decorate([
    (0, common_1.Controller)("cinema"),
    (0, swagger_1.ApiTags)("cinema"),
    __metadata("design:paramtypes", [cinema_service_1.CinemaService])
], CinemaController);
exports.CinemaController = CinemaController;
//# sourceMappingURL=cinema.controller.js.map