import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { validate } from "class-validator";
import { ExtractJwt, Strategy } from "passport-jwt";
import { async } from "rxjs";
import { UserService } from "src/user/user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        private userService: UserService
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_KEY
        })
    }

    async validate(payload:any){
        let user = await this.userService.findOne(payload.id)
        if (user) {
            return {id: user.id, name_user: user.name_user}
        } else {
            throw new UnauthorizedException()
        }
    }
}