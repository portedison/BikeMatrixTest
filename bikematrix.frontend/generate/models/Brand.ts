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
import type { Bike } from './Bike';
import {
    BikeFromJSON,
    BikeFromJSONTyped,
    BikeToJSON,
} from './Bike';

/**
 * 
 * @export
 * @interface Brand
 */
export interface Brand {
    /**
     * 
     * @type {number}
     * @memberof Brand
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof Brand
     */
    name?: string | null;
    /**
     * 
     * @type {Array<Bike>}
     * @memberof Brand
     */
    bikes?: Array<Bike> | null;
}

/**
 * Check if a given object implements the Brand interface.
 */
export function instanceOfBrand(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function BrandFromJSON(json: any): Brand {
    return BrandFromJSONTyped(json, false);
}

export function BrandFromJSONTyped(json: any, ignoreDiscriminator: boolean): Brand {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'name': !exists(json, 'name') ? undefined : json['name'],
        'bikes': !exists(json, 'bikes') ? undefined : (json['bikes'] === null ? null : (json['bikes'] as Array<any>).map(BikeFromJSON)),
    };
}

export function BrandToJSON(value?: Brand | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'name': value.name,
        'bikes': value.bikes === undefined ? undefined : (value.bikes === null ? null : (value.bikes as Array<any>).map(BikeToJSON)),
    };
}

