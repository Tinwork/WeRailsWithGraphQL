module Fields
    ##
    # @package             Models/Graph/Fields::FetchField
    # @author              Didier Youn <didier.youn@gmail.com>, Marc Intha-Amnouay <marc.inthaamnouay@gmail.com>, Antoine Renault <antoine.renault.mmi@gmail.com>
    # @copyright           Copyright (c) 2017 Tinwork
    # @link                https://github.com/Tinwork/WeRailsWithGraphQl
    ##
    class FetchField
        ## Build GraphQL schema field by model and type
        # Example :
        # --> Model : Burger
        # --> Type : burger_type.rb
        ##
        def self.build(model:, type:)
            return_type = type
            GraphQL::Field.define do
                type(return_type)
                description("Find a #{model.name} by ID")
                argument(:id, !types.Int, "ID for Record")
                resolve ->(obj, args, ctx) {
                  model.find(args["id"])
                }
            end
      end
  end
end