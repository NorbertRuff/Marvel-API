import connection


@connection.connection_handler
def get_user_id(cursor, username):
    query = """
            SELECT id FROM users WHERE name = %(username)s
            """
    var = {'username': username}
    cursor.execute(query, var)
    return cursor.fetchone()


@connection.connection_handler
def add_new_user(cursor, new_username, new_password):
    query = """
        INSERT INTO users
        VALUES (DEFAULT, %(new_username)s, %(new_password)s);
        """
    var = {'new_username': new_username, 'new_password': new_password}
    cursor.execute(query, var)


@connection.connection_handler
def get_user_login_data(cursor, username):
    query = """
        SELECT name, password FROM users
        WHERE name = %(username)s
        """
    var = {'username': username}
    cursor.execute(query, var)
    return cursor.fetchall()


@connection.connection_handler
def get_user_id_from_username(cursor, username):
    query = """
        SELECT id FROM users
        WHERE name = %(username)s
        """
    var = {'username': username}
    cursor.execute(query, var)
    return cursor.fetchone()




