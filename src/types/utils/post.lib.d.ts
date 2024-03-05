import {PostECommercePricingDocument, PostECommerceVariationContentDocument} from "types/services/post.service";

export interface ProductDataForProductsResultDocument {
    contents?: PostECommerceVariationContentDocument,
    pricing: PostECommercePricingDocument
}