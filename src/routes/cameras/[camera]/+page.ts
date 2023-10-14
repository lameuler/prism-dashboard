import { error } from '@sveltejs/kit';
import type { Camera } from '$lib/cameras.js'

export async function load({ params, parent,  }) {
    const { cameras } = await parent()
    const matching = (cameras as Camera[]).filter(c => c.id == params.camera)
    if (matching.length > 0){
        return matching[0]
    } else {
        throw error(404, 'Not found');
    }
}