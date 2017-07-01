module Fields
  ##
  # @package             Models/Graph/Fields::FetchByName
  # @author              Didier Youn <didier.youn@gmail.com>, Marc Intha-Amnouay <marc.inthaamnouay@gmail.com>, Antoine Renault <antoine.renault.mmi@gmail.com>
  # @copyright           Copyright (c) 2017 Tinwork
  # @link                https://github.com/Tinwork/WeRailsWithGraphQl
  ##
  class FetchByName
    ## Build GraphQL schema field by model and type
    # Example :
    # --> Model : Burger
    # --> Type : burger_type.rb
    ##
    def self.build(model:, type:)
      return_type = type
      GraphQL::Field.define do
        type(return_type)
        description("Find a #{model.name} by Name")
        argument(:label, !types.String, "Name of the record")
        resolve ->(obj, args, ctx) {
          model.find(label: args["label"])
        }
      end
    end
  end
end