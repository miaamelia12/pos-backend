import { Injectable } from '@nestjs/common';
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { getConnection } from 'typeorm';

@ValidatorConstraint({async:true})
@Injectable()
export class ExistValidator implements ValidatorConstraintInterface {
    async validate(value:any, args:ValidationArguments){
        let find = { [args.constraints[1]] : args.value }
        let cek = await getConnection().getRepository(args.constraints[0]).findOne(find)
        if (cek) return true
        return false
    }
    defaultMessage(args:ValidationArguments) {
        return args.property+ ' ' + args.value + ' can not found'
    }
}

export function IsExist(option:any, validationOption?:ValidationOptions) {
    return function (object:any, propertyName:string) {
        registerDecorator({
            name: 'IsExist',
            target: object.constructor,
            propertyName: propertyName,
            constraints: option,
            validator: ExistValidator,
            async: true
        })
    }
}
