##
# Class UserController
#
# @package             Controllers/Frontend
# @authors             Didier Youn <didier.youn@gmail.com>, Marc Intha-Amnouay <marc.inthaamnouay@gmail.com>, Antoine Renault <antoine.renault.mmi@gmail.com>
# @copyright           Copyright (c) 2017 Tinwork
# @link                https://github.com/Tinwork/WeRailsWithGraphQl
##
class Frontend::UserController < ApplicationController
    def index
        id = params[:id]
        if (id)
            return render json: ['collection' => User.find_by_id(id)]
        end

        render json: ['collection' => nil]
    end

    def with_friends
        id = params[:id]
        if (id)
            @user = User.find_by_id(id)
            result = {}
            result['user'] = {}
            result['user']['id'] = @user.id
            result['user']['email'] = @user.email
            result['user']['created_at'] = @user.created_at
            result['user']['updated_at'] = @user.updated_at
            result['user']['username'] = @user.username
            result['user']['friends'] = @user.friends

            return render json: ['collection' => result]
        end

        render json: ['collection' => nil]
    end

    def with_friends_details
        id = params[:id]
        if (id)
            @user = User.find_by_id(id)
            result = {}
            result['user'] = {}
            result['user']['id'] = @user.id
            result['user']['email'] = @user.email
            result['user']['created_at'] = @user.created_at
            result['user']['updated_at'] = @user.updated_at
            result['user']['username'] = @user.username
            result['user']['friends'] = []

            @user.friends.each do | friend |
                tmp = {}
                tmp['id'] = friend.id
                tmp['email'] = friend.email
                tmp['created_at'] = friend.created_at
                tmp['updated_at'] = friend.updated_at
                tmp['username'] = friend.username
                tmp['friends'] = friend.friends

                result['user']['friends'].push(tmp)
            end

            return render json: ['collection' => result]
        end

        render json: ['collection' => nil]
    end
end
