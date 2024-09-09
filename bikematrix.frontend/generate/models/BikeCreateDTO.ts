/* tslint:disable */
/* eslint-disable */
/**
 * BikeMatrix API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import type { BrandDTO } from './BrandDTO';
import {
    BrandDTOFromJSON,
    BrandDTOFromJSONTyped,
    BrandDTOToJSON,
} from './BrandDTO';
import type { OwnerDTO } from './OwnerDTO';
import {
    OwnerDTOFromJSON,
    OwnerDTOFromJSONTyped,
    OwnerDTOToJSON,
} from './OwnerDTO';

/**
 * 
 * @export
 * @interface BikeCreateDTO
 */
export interface BikeCreateDTO {
    /**
     * 
     * @type {string}
     * @memberof BikeCreateDTO
     */
    model?: string | null;
    /**
     * 
     * @type {number}
     * @memberof BikeCreateDTO
     */
    year?: number;
    /**
     * 
     * @type {OwnerDTO}
     * @memberof BikeCreateDTO
     */
    owner?: OwnerDTO;
    /**
     * 
     * @type {BrandDTO}
     * @memberof BikeCreateDTO
     */
    brand?: BrandDTO;
}

/**
 * Check if a given object implements the BikeCreateDTO interface.
 */
export function instanceOfBikeCreateDTO(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function BikeCreateDTOFromJSON(json: any): BikeCreateDTO {
    return BikeCreateDTOFromJSONTyped(json, false);
}

export function BikeCreateDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): BikeCreateDTO {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'model': !exists(json, 'model') ? undefined : json['model'],
        'year': !exists(json, 'year') ? undefined : json['year'],
        'owner': !exists(json, 'owner') ? undefined : OwnerDTOFromJSON(json['owner']),
        'brand': !exists(json, 'brand') ? undefined : BrandDTOFromJSON(json['brand']),
    };
}

export function BikeCreateDTOToJSON(value?: BikeCreateDTO | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'model': value.model,
        'year': value.year,
        'owner': OwnerDTOToJSON(value.owner),
        'brand': BrandDTOToJSON(value.brand),
    };
}

