import {PostECommercePricingDocument, PostECommerceVariationContentDocument} from "types/services/post";

export interface ProductDataForProductsResultDocument {
    contents?: PostECommerceVariationContentDocument,
    pricing: PostECommercePricingDocument
}