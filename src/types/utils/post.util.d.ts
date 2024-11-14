import {
  IPostECommercePricingModel,
  IPostECommerceVariationContentModel,
} from 'types/models/post.model';

export interface IProductDataForProductsResultUtil {
  contents?: IPostECommerceVariationContentModel;
  pricing: IPostECommercePricingModel;
}
